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
        var priority;

        switch (record.data['priority']) { //TODO: make better solution than switch
            case 'none':
                priority = 'low';
                break;
            case 'low':
                priority = 'normal';
                break;
            case 'normal':
                priority = 'high';
                break;
            case 'high':
            default:
                priority = 'none';
                break;
        }

        record.set('priority', priority);
    }
});