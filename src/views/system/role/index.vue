<template>
  <a-card>
    <div class="topic">角色管理</div>
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
        <a-form-model-item label="角色名称：" prop="name">
          <a-input placeholder="请输入角色名称" v-model="form.name"/>
        </a-form-model-item>
        <a-form-model-item  label="角色编码："  prop="code">
          <a-input placeholder="请输入角色编码" v-model="form.code"/>
        </a-form-model-item>
        <a-form-model-item label="角色授权内容" prop="role">
          <a-tree
            v-model="form.role"
            checkable
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @check="onCheck"
            @expand="onExpand"
            @select="onSelect"
          />
        </a-form-model-item>
        <a-form-model-item label="是否可用：" prop="state">
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

import { mapGetters } from 'vuex'

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
      },
      visible: true,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      other: '',
      form: {
        name: '',
        code: '',
        role: [],
        state: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
        role: [{ type: 'array', required: true, message: '请选择角色', trigger: 'change' }],
        state: [{ required: true, message: '请选择是否可用', trigger: 'change' }]
      },
      expandedKeys: [],
      autoExpandParent: false,
      selectedKeys: [],
      treeData: [
        {
          title: '全部',
          key: '0-0',
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' }
              ]
            },
            {
              title: '0-0-1',
              key: '0-0-1',
              children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' }
              ]
            },
            {
              title: '0-0-2',
              key: '0-0-2'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  mounted () {
    // this.getTeams()
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
    },
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      if (checkedKeys.length !== 0) {
         this.$refs['ruleForm'].clearValidate(['role'])
      } else {
         this.$refs['ruleForm'].validateField(['role'])
      }
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
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
