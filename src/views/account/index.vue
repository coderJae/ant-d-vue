<template>
  <a-card>
    <div class="topic">账号管理</div>
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
      <span slot="state" slot-scope="text, record">
        <span style="margin-right:10px;">{{ record.state ? '有效' : '无效' }}</span><a-switch size="small" v-model="record.state"/>
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
          title: '账号状态',
          key: 'state',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        }
      ],
      data: [
        {
          key: '1',
          name: '深圳天天向上税务所',
          type: '机构',
          tel: '075-12345678',
          state: 1
        }
      ],
      pagination: {
        total: 1000,
        current: 1,
        pageSize: 10
      },
      tagInputVisible: false,
      tagInputValue: '',

      teams: [],
      teamSpinning: true,

      tabListNoTitle: [
        {
          key: 'article',
          tab: '文章(8)'
        },
        {
          key: 'app',
          tab: '应用(8)'
        },
        {
          key: 'project',
          tab: '项目(8)'
        }
      ],
      noTitleKey: 'app'
    }
  },
  methods: {
    handleSubmit (e) {
      console.log(this.formInline)
    },
    tableChange (e) {
      this.pagination.current = e.current
    },
    handleTabChange (key, type) {
      this[type] = key
    },

    handleTagClose (removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },

    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },

    handleInputChange (e) {
      this.tagInputValue = e.target.value
    },

    handleTagInputConfirm () {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }

      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
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
