<template>
  <a-card>
    <div class="topic">用户管理</div>
    <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item>
        <a-input v-model="formInline.name" placeholder="请输入姓名或用户名"></a-input>
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
      <a-form-model-item>
        <a-button type="primary" icon="plus-circle" ghost @click="addUser"> 新建 </a-button>
      </a-form-model-item>
    </a-form-model>
    <!-- 列表 -->
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
        <a @click="edit(record)"><a-icon type="edit" /> 编辑</a>
        <a-divider type="vertical" />
        <a @click="del(record)"><a-icon type="delete" /> 删除</a>
      </span>
    </a-table>
    <!-- 弹窗 -->
    <a-modal v-model="visible" :footer="null" title="新增用户" @ok="handleOk">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="姓名：" prop="name">
          <a-input placeholder="请输入" v-model="form.name"/>
        </a-form-model-item>
        <a-form-model-item label="用户名：" prop="username">
          <a-input placeholder="请输入" v-model="form.username"/>
        </a-form-model-item>
        <a-form-model-item label="密码：" prop="password">
          <a-input placeholder="请输入" type="password" v-model="form.password"/>
        </a-form-model-item>
        <a-form-model-item label="确认密码：" prop="checkPass">
          <a-input placeholder="请输入" type="password" v-model="form.password2"/>
        </a-form-model-item>
        <a-form-model-item label="手机号：" placeholder="请输入">
          <a-input placeholder="请输入" v-model="form.phone"/>
        </a-form-model-item>
        <a-form-model-item label="邮箱：" placeholder="请输入">
          <a-input placeholder="请输入" v-model="form.email"/>
        </a-form-model-item>
        <a-form-model-item label="角色" prop="role">
          <a-select mode="multiple" v-model="form.role" placeholder="请选择角色">
            <a-select-option v-for="(item,index) in [1,2,3,4,5,6]" :key="index" :value="item">
              {{ '角色' + item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="所属机构" prop="organize">
          <a-select v-model="form.organize" placeholder="请选择所属机构">
            <a-select-option value="shanghai">
              Zone one
            </a-select-option>
            <a-select-option value="beijing">
              Zone two
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="账号">
          <a-radio-group v-model="form.state">
            <a-radio value="1">
              有效
            </a-radio>
            <a-radio value="2">
              无效
            </a-radio>
          </a-radio-group>
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
  name: 'User',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次密码不匹配!'))
      } else {
        callback()
      }
    }
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
      },
      visible: true,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      other: '',
      form: {
        name: '',
        username: '',
        password: '',
        checkPass: '',
        phone: '',
        email: '',
        role: undefined,
        organize: undefined,
        state: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        role: [{ type: 'array', required: true, message: '请选择角色', trigger: 'change' }],
        organize: [{ required: true, message: '请选择所属机构', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleSubmit (e) {
      console.log(this.formInline)
    },
    tableChange (e) {
      this.pagination.current = e.current
    },
    addUser () {
      this.visible = true
    },
    edit () {
      this.visible = true
    },
    del () {

    },
    handleOk () {

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
