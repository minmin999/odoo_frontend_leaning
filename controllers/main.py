# -*- coding: utf-8 -*-
import logging
from odoo import http

_logger = logging.getLogger('ff.CustServiceController')


class CustServiceController(http.Controller):

    @http.route('/odoo_frontend_leaning/get_contents', methods=['POST'], auth='public', csrf=False, type='json')
    def get_article_contents(self, **kw):
        contents = {
            'text': '演示从后台返回数据',
            'show_image': True,
            'image': '/odoo_frontend_leaning/static/image/widget.png',
        }
        return contents
