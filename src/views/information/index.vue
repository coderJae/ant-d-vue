<template>
  <a-card>
    <div class="topic">咨询维护 <a-button type="primary" icon="rocket" ghost @click="visible = true" style="float:right"> 发布 </a-button></div>
    <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item>
        <a-input v-model="formInline.name" placeholder="请输入名称"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.user === '' || formInline.password === ''"
        >
          查询
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" style="margin-top:30px">
      <!-- <span slot="state" slot-scope="text">
        {{text}}
      </span> -->
      <span slot="action" slot-scope="text, record">
        <a @click="edit(record)"><a-icon type="edit" /> 编辑</a>
        <a-divider type="vertical" />
        <a @click="del(record)"><a-icon type="delete" /> 删除</a>
      </span>
    </a-table>
    <!-- 新增 编辑 -->
    <a-modal v-model="visible" :width="1000" :footer="null" title="编辑资讯">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        layout="inline"
      >
        <a-form-model-item label="标题：" prop="name">
          <a-input placeholder="请输入机构名称" style="width:240px;" v-model="form.name"/>
        </a-form-model-item>
        <a-form-model-item label="发送时间：" prop="dateTime">
          <a-date-picker
            placeholder="请选择发布时间"
            format="YYYY-MM-DD HH:mm:ss"
            v-model="form.dateTime"
            :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          />
        </a-form-model-item>
        <a-form-model-item style="width:950px;margin:20px 0;" :wrapper-col="{span: 24}" prop="pushContent">
          <editor
            v-model="form.pushContent"
            :init="init"
            :disabled="disabled"
            @onClick="onClick">
          </editor>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSubmit">
            确定
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-card>
</template>

<script>
import moment from 'moment'
// import Tinymce from '@/components/Tinymce'
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'

import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/icons/default' // icon图标
export default {
  components: {
    // Tinymce
    Editor
  },
  props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        plugins: {
            type: [String, Array],
            default: 'lists image media table wordcount'
        },
        toolbar: {
            type: [String, Array],
            default: 'undo redo | fontselect | fontsizeselect | lineheight_formats | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
        }
	},
  data () {
    return {
      visible: false,
      form: {
        name: '',
        dateTime: undefined,
        pushContent: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        dateTime: [
          { required: true, message: '请选择发布时间', trigger: 'change' }
        ],
        pushContent: [
          { required: true, message: '请编辑资讯内容', trigger: 'blur' }
        ]
      },
      formInline: {
        name: '',
        region: undefined,
        state: undefined
      },
      pagination: {
        total: 1000,
        current: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '序号',
          customRender: (text, record, index) => `${(this.pagination.current - 1) * this.pagination.pageSize + index + 1}`
        },
        {
          title: '资讯标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '发布时间',
          dataIndex: 'publishDate',
          key: 'publishDate'
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          customRender: function (text, record, index) {
               let label
               switch (text) {
                   case 0:
                     label = '未发送'
                     break
                   case 1:
                     label = '已发送'
                     break
                   case 2:
                     label = '已编辑'
                     break
                   default:
                     label = text
                     break
               }

               return label
          }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [
        {
          key: '1',
          title: '这里是标题',
          publishDate: '2021/05/05 19:33.26',
          publishAuthor: '张三',
          state: 0
        },
        {
          key: '2',
          title: '这里是标题',
          publishDate: '2021/05/05 19:33.26',
          publishAuthor: '张三',
          state: 1
        }
      ],
      init: {
          language_url: '/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/tinymce/skins/ui/oxide', // 暗色系 oxide-dark
          height: 600,
          plugins: this.plugins,
          toolbar: this.toolbar,
          font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif',
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
          lineheight_formats: '1 1.2 1.5 1.6 1.8 2 2.4',
          branding: false,
          menubar: false,
          // automatic_uploads:true,
          // images_upload_url:'http://124.128.226.201:28080/sys/oss/upload',
          // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
          images_upload_handler: (blobInfo, success, failure) => {
          console.log(blobInfo)
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(img)
          const formData = new FormData()
          formData.append('file', blobInfo.blob(), blobInfo.filename())

          const config = {
              headers: { 'Content-Type': 'multipart/form-data' }
          }

          this.axios.post('http://124.128.226.201:28080/sys/oss/upload', formData, config).then(res => {
              console.log(res.data.src)
              success(res.data.src)
          })
          }
      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function (newV, oldV) {
         this.$refs['ruleForm'].validateField(['pushContent'])
      }
    }
  },
  methods: {
    moment,
    edit () {
      this.visible = true
    },
    handleSubmit (e) {
      console.log(this.formInline)
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    onClick (e) {
      console.log(this.myValue)
      this.$emit('onClick', e, tinymce)
    },
    onSubmit () {
      console.log(this.form)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    tinymce.init({})
  }
}
</script>

<style lang="less" scoped>
.topic{
  height:18px;
  line-height:18px;
  border-left:3px solid #1890ff;
  padding-left:10px;
  font-weight:bold;
  font-size:16px;
  letter-spacing:1px;
  margin-bottom:30px;
}
</style>
