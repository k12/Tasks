Ext.define('Tasks.controller.Tasks', {
    extend: 'Ext.app.Controller',

    models: ['Task'],
    stores: ['Tasks'],

    views: [
        'tasks.TabPanel',
        'tasks.Grid',
        'tasks.Details'
    ],

    refs: [
        {
            ref: 'detailsPanel',
            selector: 'detailsPanel'
        }
    ],

    init: function() {
        this.control(
            {
                'viewport tasksGrid dataview': {
                    itemclick: this.showDetails
                },
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

    showDetails : function(grid, record) {
        this.getDetailsPanel().updateDetails(record.data);
    },

    showActions: function(view, task, node, rowIndex, e) {
        var icons = Ext.DomQuery.select('.can-be-hidden', node);

        Ext.each(icons, function(icon){
                Ext.get(icon).removeCls('x-hidden');
        });
    },

    hideActions: function(view, task, node, rowIndex, e) {
        var icons = Ext.DomQuery.select('.can-be-hidden', node);

        Ext.each(icons, function(icon){
                Ext.get(icon).addCls('x-hidden');
        });
    },

    changePriority: function(record) {
        var switchMap = { 'None': 'Low', 'Low': 'Normal', 'Normal': 'High', 'High': 'None' };

        record.set('priority', switchMap[record.data['priority']]);
    }
});