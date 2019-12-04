odoo.define('odoo_frontend_leaning.month_picker', function (require) {
    "use strict";

    var DebouncedField = require('web.basic_fields').DebouncedField;
    var registry = require('web.field_registry');

    var FieldMonthPicker = DebouncedField.extend({
        template: 'FieldMonthPicker',
        custom_events: _.extend({}, DebouncedField.prototype.custom_events, {
            field_changed: '_onFieldChanged',
        }),
        events: _.extend({}, DebouncedField.prototype.events, {
            'click .o_link_dialog_color_item input': '_onClickMonthItem',
            'change .picker_year': '_onChangeYear',
            'click .number-minus': '_onChangeYear',
            'click .number-plus': '_onChangeYear',
        }),
        supportedFieldTypes: ['char'],
        init: function () {
            this._super.apply(this, arguments);
            var related_field = this.nodeOptions.related_field, year, month;
            if (related_field) {
                var value = this.recordData[related_field];
                year = value.year();
                month = value.month() + 1;
            }
            this.setData(year, month);
        },
        start: function () {
            var self = this;
            return this._super.apply(this, arguments).done(function () {
                self._setValue(self.year_month);
            });
        },
        reset: function (record, event) {
            var value = record.data[this.name];
            var year, month;
            if (value) {
                var v = value.split('-');
                year = v[0];
                month = v[1];
            }
            this.setData(year, month);
            this._super.apply(this, arguments);
        },
        setData: function (year, month) {
            if (!year || !month) {
                var date = new Date;
                year = date.getFullYear();
                month = date.getMonth() + 1;
            }
            this.year = Number(year);
            this.month = Number(month);
            var year_month = year + '-' + ('0' + month).substr(-2, 2);
            this.year_month = year_month;
        },
        _onChangeYear: function (e) {
            var year = this.$('.picker_year').val();
            this.setData(year, this.month);
            this._render();
            this._setValue(this.year_month);
        },
        _onClickMonthItem: function (e) {
            var month = this.$(e.target).val();
            this.setData(this.year, month);
            this._render();
            this._setValue(this.year_month);
        },
        _onFieldChanged: function (event) {
            event.month_picker = true;
            this.lastChangeEvent = event;
        },
        _render: function () {
            this.renderElement();
            this.$el.find('.picker_year').number();
        },
    });

    registry.add('monthpicker', FieldMonthPicker);

    return FieldMonthPicker;

});