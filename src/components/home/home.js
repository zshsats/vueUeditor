import Vue from 'vue'
import UEditor from 'src/shareModule/ueditor/ueditor.js';
let tpl= require('./home.html');
require('./home.less');
const Home= Vue.component('Home', {
    template:tpl,
    components:{
        UEditor
    },
    data(){
       return {
           content: 'fffff',
           config: {

               initialFrameHeight: 400,
               toolbars: [
                   [
                       'source',
                       'undo', //撤销
                       'redo', //重做
                       'bold', //加粗
                       'italic', //斜体
                       'underline', //下划线
                       'strikethrough', //删除线
                       'subscript', //下标
                       'fontborder', //字符边框
                       'superscript', //上标
                       'selectall', //全选
                       'horizontal', //分隔线
                       'removeformat', //清除格式
                       'time', //时间
                       'date', //日期
                       'fontsize', //字号
                       'paragraph', //段落格式
                       'simpleupload', //单图上传
                       'link', //超链接
                       'searchreplace', //查询替换
                       'justifyleft', //居左对齐
                       'justifyright', //居右对齐
                       'justifycenter', //居中对齐
                       'justifyjustify', //两端对齐
                       'forecolor', //字体颜色
                       'insertorderedlist', //有序列表
                       'insertunorderedlist', //无序列表
                       'lineheight', //行间距
                       'inserttable', //插入表格


                   ]
               ],
               zIndex: 10, // 编辑器层级
               charset: 'utf-8', //编码
               autoHeightEnabled: false,
           },


       }
    },
    created(){

    },
    computed: {

    },
    methods:{

        //初始化编辑器
        editorReady (instance) {
            const that = this;
            instance.setContent(this.content);
            instance.addListener('contentChange', () => {
                this.content = instance.getContent();
            });
        },


    }
})

export default Home;