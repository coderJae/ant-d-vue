<template>
  <a-card>
    <div class="topic">机构管理 <a-button type="primary" icon="plus-circle" ghost @click="add" style="float:right"> 新建 </a-button></div>
    <a-table :columns="columns" :data-source="data" :expanded-row-keys.sync="expandedRowKeys">
      <span slot="action" slot-scope="text, record">
        <a @click="add(record)"><a-icon type="plus-circle" /> 新增</a>
        <a-divider type="vertical" />
        <a @click="edit(record)"><a-icon type="edit" /> 编辑</a>
        <a-divider type="vertical" />
        <a @click="del(record)"><a-icon type="delete" /> 删除</a>
      </span>
    </a-table>
    <!-- 新增 编辑 -->
    <a-modal v-model="visible" :footer="null" title="新增机构">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="机构名称：" prop="name">
          <a-input placeholder="请输入机构名称" v-model="form.name"/>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
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
export default {
  data () {
    return {
      visible: false,
      form: {
        name: ''
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [
        {
          key: 1,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 1 Lake Park',
          children: [
            {
              key: 11,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 2 Lake Park'
            },
            {
              key: 12,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 3 Lake Park',
              children: [
                {
                  key: 121,
                  name: 'Jimmy Brown',
                  age: 16,
                  address: 'New York No. 3 Lake Park'
                }
              ]
            },
            {
              key: 13,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 1 Lake Park',
              children: [
                {
                  key: 131,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 2 Lake Park',
                  children: [
                    {
                      key: 1311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 3 Lake Park'
                    },
                    {
                      key: 1312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 4 Lake Park'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ]
      },
      expandedRowKeys: []
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    edit () {
      this.visible = true
    },
    del () {

    },
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.topic{
  display:flex;
  justify-content:space-between;
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
