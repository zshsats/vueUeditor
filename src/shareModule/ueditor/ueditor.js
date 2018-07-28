import Vue from 'vue'
import '../../assets/ueditor/ueditor.config.js';
import '../../assets/ueditor/ueditor.all.js';
import '../../assets/ueditor/lang/zh-cn/zh-cn.js';
let tpl= require('./ueditor.html');
require('./ueditor.less');
const ueditor= Vue.component('ueditor', {
    template: tpl,
    props: {
        //配置可以传递进来
        config: {
            type: Object,
            default: () => {}
        },
        content: {
            type: String,
            default: '',
        }
    },
    data () {
        return {
            randomNumber: 'editor_' + Math.random().toString(6).substring(2),
            instance: null
        };
    },

    methods: {
        initUeditor(){
            const that  =this;
            that.$nextTick(() => {
                that.instance = window.UE.getEditor(this.$refs.randomNumber, this.config);
                // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
                that.instance.addListener('ready', () => {
                    that.$emit('ready', that.instance);
                });
            });

        },
        //追加内容
        setContent(text) {
            this.instance.setContent(text, true);
        },
        addContent(content) {
            this.instance.setContent(content);
        },
        //清空文本
        setEmptyContent() {
            this.instance.setContent('');
        },
        //插入HTML内容
        insertHtml(content) {
            this.instance.execCommand('insertHtml', content);
        }



    },
    created () {
        this.initUeditor();
    },

    mounted () {

    },

    beforeDestroy () {
        // 组件销毁的时候，要销毁 UEditor 实例
        if (this.instance !== null && this.instance.destroy) {
            this.instance.destroy();
        }
    },

});
export default ueditor;