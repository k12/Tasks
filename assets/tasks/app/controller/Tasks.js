Ext.define('Tasks.controller.Tasks', {
    extend: 'Ext.app.Controller',

    models: ['Task'],
    stores: ['Tasks'],

    views: [
        'tasks.TabPanel',
        'tasks.CreateForm',
        'tasks.Grid',
        'tasks.Details'
    ],

    refs: [
        {
            ref: 'tasksGrid',
            selector: 'tasksGrid'
        },
        {
            ref: 'createForm',
            selector: 'createForm'
        },
        {
            ref: 'detailsPanel',
            selector: 'detailsPanel'
        }
    ],

    init: function() {
        this.control(
            {
                '#create-task-btn': {
                    click: this.onCreateClick
                },
                '#edit-task-btn': {
                    click: this.onEditClick
                },
                '#delete-task-btn': {
                    click: this.onDeleteClick
                },
                'viewport tasksGrid dataview': {
                    itemclick: this.showDetails
                },
                'tasksGrid': {
                    itemmouseenter: this.showActions,
                    itemmouseleave: this.hideActions,
                    selectionchange: this.toggleButtons,
                    onPriorityIconClick: this.onPriorityIconClick,
                    onEditIconClick: this.onEditIconClick,
                    onDeleteIconClick: this.onDeleteIconClick,
                    onRecordEdit: this.update
                },
                'createForm textfield': {
                    specialkey: this.onSpecialKey
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

    onSpecialKey: function(field, e) {
        if(e.getKey() === e.ENTER) {
            this.create();
        }
    },

    onPriorityIconClick: function(gridView, rowIndex) {
        this.changePriority(this.getTasksStore().getAt(rowIndex));
    },

    onCreateClick: function(button, e) {
        console.log('create button click');
        console.log(arguments);
    },

    onEditClick: function(button, e) {
        console.log('edit button click called');
        console.log(arguments);
        //TODO show edit window
    },

    onEditIconClick: function(gridView, rowIndex, colIndex, column, e) {
        console.log('edit icon click called');
        console.log(arguments);
        //TODO show edit window
    },

    onDeleteClick: function() {
        this.delete(this.getTasksGrid().getSelectionModel().getSelection());
    },

    onDeleteIconClick: function(gridView, rowIndex, colIndex, column, e) {
        this.delete(this.getTasksStore().getAt(rowIndex));
    },

    changePriority: function(record) {
        var switchMap = { 'None': 'Low', 'Low': 'Normal', 'Normal': 'High', 'High': 'None' };

        record.set('priority', switchMap[record.data['priority']]);
    },

    create: function() {
        var form = this.getCreateForm().getForm(),
            titleField = form.findField('title'),
            taskModel = Ext.create('Tasks.model.Task');

        if (form.isValid())
        {
            form.updateRecord(taskModel);
            this.getTasksStore().add(taskModel);
            titleField.reset();
        }

        //TODO save task via server side
    },

    update: function(record) {
        this.showDetails(null, record);
        console.log('update called');
        console.log(record);

        //TODO update task via server side
    },

    delete: function(record) {
        var me = this;

        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure you want to delete this tasks?',
            buttons: Ext.Msg.YESNO,
            fn: function(response) {
                if(response === 'yes') {
                    me.getTasksStore().remove(record);
                }
            }
        });


        //TODO delete task via server side
    }
});