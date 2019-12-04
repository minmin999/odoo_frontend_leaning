# -*- coding: utf-8 -*-
from odoo import models, fields, api


class OdooFrontendLearning(models.Model):
    _name = 'odoo.frontend.learning'
    _description = 'Odoo前端技术'

    name = fields.Char(string='字符串字段', default="Hello World!")
    char = fields.Char(string='字符串字段', help="用于演示CopyClipboardChar小部件", default="Hello World!")
    integer = fields.Integer(string='数字字段')
    boolean = fields.Boolean(string='布尔字段', defalut=False)
    date = fields.Date(string='日期字段', default=fields.Date.today())
    datetime = fields.Datetime(string='时间字段', default=fields.Datetime.now())
    user_id = fields.Many2one(
        string='用户',
        comodel_name='res.users',
        context="{'default_name': '1111'}",
        ondelete='restrict')
    user_id2 = fields.Many2one(
        string='用户',
        comodel_name='res.users',
        ondelete='restrict')
    process_type = fields.Selection(
        string='处理方式',
        selection=[
            ('reorder', '下补单'),
            ('refund', '退款'),
            ('no', '不处理'),
        ],
        default='refund')
    process_type2 = fields.Selection(
        string='处理方式',
        selection=[
            ('reorder', '下补单'),
            ('refund', '退款'),
            ('no', '不处理'),
        ],
        default='refund')
    account_mon = fields.Char(string='月份', default='2019-11')
    account_mon2 = fields.Char(string='月份', default='2019-11')

    @api.onchange('account_mon')
    def _onchange_user_id(self):
        return {
            'context': {
                'user_id': {'default_name': '22222'}
            }
        }
