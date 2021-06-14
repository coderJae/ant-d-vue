<template>
  <a-card>
    <div class="topic">咨询维护</div>
    <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item>
        <a-input v-model="formInline.name" placeholder="请输入名称"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-select v-model="formInline.region" style="width:200px" placeholder="请选择用户类型">
          <a-select-option value="shanghai">
            Zone one
          </a-select-option>
          <a-select-option value="beijing">
            Zone two
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-select v-model="formInline.state" style="width:200px" placeholder="请选择用户状态">
          <a-select-option value="shanghai">
            Zone one
          </a-select-option>
          <a-select-option value="beijing">
            Zone two
          </a-select-option>
        </a-select>
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
      <span slot="detail" slot-scope="text" >
        <a-tooltip placement="top">
          <template slot="title">
            <span>{{text}}</span>
          </template>
          <span>{{text.substr(0,15)}}</span>
        </a-tooltip>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="del(record)"><a-icon type="delete" /> 删除</a>
      </span>
    </a-table>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
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
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '用户类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '联系方式',
          dataIndex: 'tel',
          key: 'tel'
        },
        {
          title: '满意度',
          key: 'satisfy',
          dataIndex: 'satisfy',
          customRender: function (text, record, index) {
               let label
               switch (text) {
                   case 0:
                     label = '不满意'
                     break
                   case 1:
                     label = '一般'
                     break
                   case 2:
                     label = '满意'
                     break
                   default:
                     label = text
                     break
               }

               return label
          }
        },
        {
          title: '详情',
          dataIndex: 'detail',
          key: 'detail',
          scopedSlots: { customRender: 'detail' }
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
          name: '深圳天天向上税务所',
          type: '机构',
          tel: '07-1234567',
          satisfy: 0,
          detail: '这是满意度详情这是满意度详情这是满意度详情'
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
    del () {
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
