<template>
  <a-card>
    <div class="topic">资料管理</div>
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
    <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="tableChange" style="margin-top:30px">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"> Name</span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
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
          key: 'name',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '用户类型',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '联系方式',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '用户状态',
          key: 'tags',
          dataIndex: 'tags',
          scopedSlots: { customRender: 'tags' }
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser']
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
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
