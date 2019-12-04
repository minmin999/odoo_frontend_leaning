# -*- coding: utf-8 -*-
import logging
import datetime
from odoo import http
from odoo.addons.common.DateTime import get_current_date
from odoo.addons.common.message_utils import new_get_balance_giftcard

_logger = logging.getLogger('ff.CustServiceController')


class CustServiceController(http.Controller):

    @http.route('/odoo_frontend_leaning/get_article_contents', methods=['POST'], auth='public', csrf=False, type='json')
    def get_article_contents(self, **kw):
        contents = {
            'header': '1. Odoo JavaScript模块',
            'content': '1.1 定义一个JavaScript模块',
            'steps': [
                "在odoo_frontend_leaning/static/src/js/目录创建一个webclient_example.js文件",
                """定义一个模块
                odoo.define('odoo_frontend_leaning.OdooCustomPageExample', function (require) {

                });""",
                """将文件添加到到assets, 用于在页面上加载这个文件, 如 views\\templates.xml 所示:
<xmp>
    <template id="assets_backend" inherit_id="web.assets_backend">
        <xpath expr="." position="inside">
            <script type="text/javascript"
                    src="/odoo_frontend_leaning/static/src/js/webclient_example.js"/>
        </xpath>
    </template>
</xmp>
                """
            ],
            'image': []
        }
        return {'content': contents}

    @http.route('/odoo_frontend_leaning/get_contents', methods=['POST'], auth='public', csrf=False, type='json')
    def get_article_contents(self, **kw):
        contents = {
            'text': '演示从后台返回数据',
            'show_image': True,
            'image': '/odoo_frontend_leaning/static/image/widget.png',
        }
        return contents
