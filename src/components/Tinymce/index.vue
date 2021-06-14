<template>
    <editor
    style="width:100%;"
    v-model="pushContent"
    :init="init"
    :disabled="disabled"
    @onClick="onClick">
    </editor>
</template>

<script>
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
    name: 'Tinymec',
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
    components: {
        Editor
    },
    data () {
      return {
        pushContent: '',
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
    methods: {
      onClick (e) {
        console.log(this.myValue)
        this.$emit('onClick', e, tinymce)
      }
    },
    mounted () {
       tinymce.init({})
    }
}
</script>
