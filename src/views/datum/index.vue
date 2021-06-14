<template>
  <a-card>
    <div class="topic">资料管理 <a-button type="primary" icon="cloud-upload" ghost @click="visible = true" style="float:right"> 上传 </a-button></div>
    <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item>
        <a-input v-model="formInline.name" placeholder="请输入资料名称"></a-input>
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
    <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="tableChange" style="margin-top:30px">
      <span slot="action" slot-scope="text, record">
        <a @click="del(record)"><a-icon type="delete" /> 删除</a>
      </span>
    </a-table>
    <!-- 新增 编辑 -->
    <a-modal v-model="visible" :footer="null" title="上传文件">
      <a-upload
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :headers="headers"
        @change="handleChange"
      >
        <a-button> <a-icon type="upload" /> 点击上传文件 </a-button>
      </a-upload>
    </a-modal>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      visible: true,
      headers: {
        authorization: 'authorization-text' // 获取token
      },
      formInline: {
        name: '',
        region: undefined,
        state: undefined
      },
      columns: [
        {
          title: '序号',
          customRender: (text, record, index) => `${(this.pagination.current - 1) * this.pagination.pageSize + index + 1}`
        },
        {
          title: '资料名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '格式',
          dataIndex: 'format',
          key: 'format'
        },
        {
          title: '大小',
          dataIndex: 'size',
          key: 'size'
        },
        {
          title: '上传时间',
          dataIndex: 'uploadTime',
          key: 'uploadTime'
        },
        {
          title: '上传人',
          dataIndex: 'uploadAuthor',
          key: 'uploadAuthor'
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
          name: '文件名',
          format: 'doc',
          size: '6M',
          uploadTime: '2021/05/05 12:20:36',
          uploadAuthor: '张三'
        }
      ],
      pagination: {
        total: 1000,
        current: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handleSubmit (e) {
      console.log(this.formInline)
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
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
