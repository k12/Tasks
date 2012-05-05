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
            ref: 'tasksGrid',
            selector: 'tasksGrid'
        },
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
                    selectionchange: this.toggleButtons,
                    onPriorityIconClick: this.onPriorityIconClick,
                    onRecordEdit: this.update
                }
            }
        );
    },

    showDetails: function(gridView, record) {
        this.getDetailsPanel().updateDetails(record.data);
    },

    showActions: function(gridView, record, node, rowIndex, e) {
        var icons = Ext.DomQuery.select('.can-be-hidden', node);

        Ext.each(icons, function(icon){
            Ext.get(icon).removeCls('x-hidden');
        });
    },

    hideActions: function(gridView, record, node, rowIndex, e) {
        var icons = Ext.DomQuery.select('.can-be-hidden', node);

        Ext.each(icons, function(icon){
            Ext.get(icon).addCls('x-hidden');
        });
    },

    toggleButtons: function(selModel, record) {
        var editTaskBtn = Ext.getCmp('edit-task-btn'),
            deleteTaskBtn = Ext.getCmp('delete-task-btn');

        if(record.length === 0) {
            editTaskBtn.disable();
            deleteTaskBtn.disable();
        }
        else {
            editTaskBtn.enable();
            deleteTaskBtn.enable();
        }
    },

    onPriorityIconClick: function(gridView, rowIndex) {
        this.changePriority(this.getTasksStore().getAt(rowIndex));
    },

    changePriority: function(record) {
        var switchMap = { 'None': 'Low', 'Low': 'Normal', 'Normal': 'High', 'High': 'None' };

        record.set('priority', switchMap[record.data['priority']]);
    },

    update: function(record) {
        this.showDetails(null, record);
        console.log('update called');
        //TODO update task via server side
    }
});