Ext.define('Tasks.controller.Tasks', {
    extend: 'Ext.app.Controller',

    models: ['Task'],
    stores: ['Tasks'],

    views: [
        'tasks.TabPanel',
        'tasks.Grid',
        'tasks.Details'
    ],

    init: function() {
        this.control(
            {
                'tasksGrid': {
                    itemmouseenter: this.showActions,
                    itemmouseleave: this.hideActions,
                    cellclick: this.onCellClick
                }
            }
        );
    },

    onCellClick: function(grid, td, cellIndex, record) {
        if (cellIndex == 2) {
            this.changePriority(record);
        }
    },

    showActions: function(view, task, node, rowIndex, e) {
        var icons = Ext.DomQuery.select('.x-action-col-icon', node);

        Ext.each(icons, function(icon){
                Ext.get(icon).removeCls('x-hidden');
        });
    },

    hideActions: function(view, task, node, rowIndex, e) {
        var icons = Ext.DomQuery.select('.x-action-col-icon', node);

        Ext.each(icons, function(icon){
                Ext.get(icon).addCls('x-hidden');
        });
    },

    changePriority: function(record) {
        var switchMap = { 'none': 'low', 'low': 'normal', 'normal': 'high', 'high': 'none' };

        record.set('priority', switchMap[record.data['priority']]);
    }
});