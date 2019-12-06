odoo.define('odoo_frontend_leaning.OdooJsArticle', function (require) {

    var Widget = require('web.Widget');
    var core = require('web.core');

    // 定义Class1类， 它继承了core.Class, 因此它有了extend和include方法
    var Class1 = core.Class.extend({
        function1: function () {
            alert('调用了Class1.function1');
        }
    });

    // 定义Class2类， 它继承了Class1，它就拥有了Class1里面定义的方法和属性
    var Class2 = Class1.extend({ // Class2继承了Class1
        function1: function () { //重写了Class1的方法
            // 调用父类中**同名**的方法，使用这个方法实现了代码重用
            this._super(); // 背后的实现是, 把这行代码替换成Class1.function1里面的代码
            alert('调用了Class2.function1'); // 添加了自己的代码
        },
        function2: function () { // 定了了一个自己的方法
            alert('调用了Class2.function2');
        }
    });

    var class1 = new Class1();
    var class2 = new Class2();

    // 定义Class3类， 它继承了Class2，它就拥有了Class1,Class2里面定义的方法和属性
    var Class3 = Class2.extend({
        // 重写父类的方法, 调用了_super执行父类的代码
        function1: function () {
            this._super(); // 调用了父类的方法
            alert('调用了Class3.function1');
        }
    });

    // 用include方法扩展已有的Class3类，重写原来的方法，或添加新的方法
    Class3.include({ // 扩展了Class3
        // 覆盖了父类的方法, 不调用_super, 父类代码不会执行
        function2: function () { // 定了了一个自己的方法
            alert('调用了Class3.function2');
        },
        function3: function () { // 通过这个定义, 给function3添加了一个新方法
            alert('调用了Class3.function3');
        }
    });

    var class3 = new Class3();

    // 定义一个ClassMixin对象
    var ClassMixin = {
        function5: function() {
            alert('ClassMixin.function5');
        }
    };

    // 定义Class4类, 它继承Class3的同时还混入了一个ClassMixin， 它因此拥有了Class1,2,3和ClassMixin的方法和属性，就是这么神奇！
    var Class4 = Class3.extend(ClassMixin, {
        function4: function() {
            alert('Class4.function4');
        }
    });
    var class4 = new Class4();

    // 定义一个最简单的Widget
    var SimpleWidget = Widget.extend({
        // 指定模板
        template: 'simple.widget',
        // 重写init方法
        init: function (parent, text, show_image, image) {
            // 调用父类的init方法
            this._super.apply(this, arguments);
            this.text = text;
            this.show_image = show_image;
            this.image = image;
        },
    });

    // 定义一个更复杂的Widget
    var ArticleSectionWidget = Widget.extend({
        template: 'odoo.js.article.section',
        // 注册jquery事件，触发元素的事件时，执行绑定的方法。注意, 元素必须位于根元素里面, 否则触发不了。
        events: {
            'click .cls1-f1': function (e) {
                class1.function1();
            },
            'click .cls1-f2': function (e) {
                class1.function2();
            },
            'click .cls2-f1': function (e) {
                class2.function1();
            },
            'click .cls2-f2': function (e) {
                class2.function2();
            },
            'click .cls3-f1': function (e) {
                class3.function1();
            },
            'click .cls3-f2': function (e) {
                class3.function2();
            },
            'click .cls4-f1': function (e) {
                class4.function1();
            },
            'click .cls4-f3': function (e) {
                class4.function3();
            },
            'click .cls4-f4': function (e) {
                class4.function4();
            },
            'click .cls4-f5': function (e) {
                class4.function5();
            },
            'click .showSimpleWidget': 'showSimpleWidget',
            'click .destroySimpleWidget': 'destroySimpleWidget',
            'click .showSimpleWidgetRpc': 'showSimpleWidgetRpc',
            'click .open_form_view': 'open_form_view',
            'click .open_url': 'open_url',
            'click .send_notify': 'send_notify',
            'click .do_set': 'do_set',
        },
        showSimpleWidget: function () {
            // 实例化一个组件, 这个时候模板并没有渲染。this表示当前组件，会成为SimpleWidget的父组件
            var widget1 = new SimpleWidget(this, "这是一个简单的Widget", true, "/odoo_frontend_leaning/static/image/class.png");
            // 清空目标元素，防止重复显示
            self.$('.show_simple').empty();
            // 调用appendTo方法, 会先将模板渲染成html, 然后再插入目标元素内部
            widget1.appendTo(self.$('.show_simple'));
            this.widget1 = widget1;
        },
        destroySimpleWidget: function () {
            if (this.widget1) {
                this.widget1.destroy();
                this.widget1 = null;
            }
            if (this.widget2) {
                this.widget2.destroy();
                this.widget2 = null;
            }
        },
        showSimpleWidgetRpc: function () {
            var self = this;
            // 演示如何从后台取数据
            this._rpc({
                route: '/odoo_frontend_leaning/get_contents',
                params: {id: 111}
            }).then(function (result) {
                var widget2 = new SimpleWidget(self, result.text, result.show_image, result.image);
                self.$('.show_simple_rpc').empty();
                widget2.appendTo(self.$('.show_simple_rpc'));
                self.widget2 = widget2;

                // 演示触发另一个Widget的自定义事件, self.getParent()获得父组件, 即ArticleWidget
                self.getParent().trigger('dataLoaded');
            });
        },
        open_form_view: function (ev) {
            // 演示如何用do_action打开一个视图
            this.do_action({
                type: 'ir.actions.act_window',
                view_type: 'form',
                view_mode: 'form',
                views: [[false, 'form']],
                target: 'new',
                name: '前端学习',
                res_model: 'odoo.frontend.learning',
                res_id: 1,
            });
        },
        open_url: function (ev) {
            // 演示如何用do_action打开一个URL
            this.do_action({
                type: 'ir.actions.act_url',
                url: 'https:\\www.baidu.com',
                target: '_blank',
            });
        },
        send_notify: function (ev) {
            // 演示如何发出通知和警告
            this.do_notify('通知', '这是一个通知！');
            this.do_warn('警告', '这是一个警告！');
        },
        do_set: function (ev) {
            // 演示2种设置组件的属性值的方法
            this.text = "text1"; // 1.直接设置
            this.do_notify('提示', "text的值是：" + this.text); // 直接获取

            this.set('show_image', true); // 2.通过set方法设置
            this.do_notify('提示', "show_image的值是：" + this.get('show_image')); // 通过get方法获取

            // 通过set方法设置属性值得好处是, 值修改时会自动触发一个change方法
            var self = this;
            this.on("change:show_image", this, function (ev) { // 监听这个事件，并绑定处理函数
                self.do_warn('提示', "show_image的值被改成了: " + ev.get('show_image'));
            });

            this.set('show_image', false); // 修改属性值
            this.set('show_image', true);

            this.off("change:show_image"); // 解除监听事件
        }
    });

    var ArticleWidget = Widget.extend({
        template: 'odoo.js.article',
        // 注册自定义事件, 通过在代码中调用 ArticleWidget实例.trigger('dataLoaded')
        custom_events: {
            dataLoaded: '_onLoadedNotify',
        },
        // 通过这段代码把2个组件添加到了页面
        start: function () {
            // 实例化文章章节组件。把this传入到ArticleSectionWidget的实例化方法中,
            // ArticleWidget和ArticleSectionWidget就有了父子关系。
            // 可以使用getParent(), getChildren()之类的方法获得组件的父组件和子组件。
            var section = new ArticleSectionWidget(this);
            // 插入到自己的根元素里面。$el就是代表根元素。

            var self = this;
            var def = section.appendTo(this.$el);
            // 由于文章导航组件的内容是从页面动态获得的， 所以要等文章章节组件渲染完毕并添加到页面
            def.then(function () {
                // 取到文章的标题
                var headers = section.$el.children().filter('h2, h3');
                var headers2 = [];
                for (var i = 0; i < headers.length - 1; i++) {
                    // 将标题的id和文本添加到数组
                    headers2.push({id: headers[i].id, text: headers[i].innerText})
                }
                // 获得OdooCustomPageAction组件的实例
                var parent = self.getParent();
                // 实例化ArticleNavigationWidget组件
                var navigation = new ArticleNavigationWidget(parent, headers2);
                // 将组件添加到页面
                navigation.replace(parent.$('aside'));
            });
        },
        _onLoadedNotify: function (ev) {
            this.do_notify('通知', '数据从后台加载完毕！');
        }
    });

    var ArticleNavigationWidget = Widget.extend({
        template: 'odoo.js.article.navigation',
        init: function (parent, headers) {
            this._super.apply(this, arguments);
            this.headers = headers;
        },
    });

    return {
        ArticleWidget: ArticleWidget,
    };
});