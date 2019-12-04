# -*- coding: utf-8 -*-

{
    'name' : 'Odoo前端技术学习',
    'version' : '1.1',
    'summary': 'Odoo前端技术学习',
    'sequence': 1,
    'author': 'xiexiaopeng',
    'description': """
    """,
    'category': 'leaning',
    'website': '2248079054@qq.com.com',
    'images' : [],
    'depends' : ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/frontend_learning_view.xml',
        'views/menu_action.xml',
        'views/templates.xml',
    ],
    'qweb': ['static/src/xml/*.xml'],
    'installable': True,
    'application': False,
    'auto_install': False
}
