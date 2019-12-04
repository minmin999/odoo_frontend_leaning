/*************************************
 * 示例1: 通过以下代码演示如何自定义一个Odoo页面
 ************************************/

// 步骤1.1.定义一个Odoo JavaScript模块
// 格式 odoo.define(模块名称, 一个函数);
odoo.define('odoo_frontend_leaning.OdooCustomPageExample', function (require) {

    // 步骤1.2.导入要用到的其他模块
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    // 导入我们自己定义的模块
    var ArticleWidget = require('odoo_frontend_leaning.OdooJsArticle').ArticleWidget;

    // 步骤1.3. 通过继承AbstractAction定义一个打开一个页面的客户动作
    var OdooCustomPageAction = AbstractAction.extend({
        // 指定用于渲染打开页面的模板, 模板定义在odoo_frontend_leaning/static/src/xml/page_example.xml
        template: 'odoo.custom.page',
        // 重写 AbstractAction.start方法, 添加渲染文章Widget的代码
        start: function () {
            var self = this;
            // 先等父对象的start方法执行完毕，再实例化子组件。
            return this._super.apply(this, arguments).then(function () {
                // 实例化组件
                var article = new ArticleWidget(self);
                // 把ArticleWidget组件添加到这个组件的o_content元素内部
                article.appendTo(self.$('.o_content'));
                // 隐藏页面元素
                $('.o_main_content').hide();
            });
        },
    });

    // 步骤1.4.注册这个动作, 注册后就可以在菜单上使用这个动作了, 比如在 odoo_frontend_leaning/views/menu_action.xml
    // <record id="action_odoo_frontend_learning1" model="ir.actions.client">
    //     <field name="name">前端框架概述</field>
    //     <field name="tag">odoo_custom_page_action</field>
    // </record>
    core.action_registry.add('odoo_custom_page_action', OdooCustomPageAction);

});

// 步骤1.5.添加到assets, 用于在页面上加载这个文件, 例如\views\templates.xml
// <script type="text/javascript" src="/odoo_frontend_leaning/static/src/js/webclient_example.js"/>
