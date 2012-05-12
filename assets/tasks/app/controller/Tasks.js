Ext.define('Tasks.controller.Tasks', {
    extend: 'Ext.app.Controller',

    models: [
        'Task',
        'User',
        'Category'
    ],

    stores: [
        'Tasks',
        'Users',
        'Categories'
    ],

    views: [
        'tasks.TabPanel',
        'tasks.CreateForm',
        'tasks.TaskWindow',
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
            ref: 'taskWindow',
            selector: 'taskWindow',
            xtype: 'taskWindow',
            autoCreate: true
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
                },
                'taskWindow #save-btn': {
                    click: this.onSaveClick
                },
                'taskWindow #cancel-btn': {
                    click: this.onCancelClick
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

    onSaveClick: function(button, e) {
        var win = this.getTaskWindow(),
            form = win.down('form').getForm();

        if(form.isValid()) {
            console.log('saving...');
        }
        else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
        }
    },

    onCancelClick: function(button, e) {
        this.closeTaskWindow();
    },

    onPriorityIconClick: function(gridView, rowIndex) {
        this.changePriority(this.getTasksStore().getAt(rowIndex));
    },

    onCreateClick: function(button, e) {
        this.showTaskWindow();
    },

    onEditClick: function(button, e) {
        var records = this.getTasksGrid().getSelectionModel().getSelection();

        this.showTaskWindow(records[records.length - 1]);
    },

    onEditIconClick: function(gridView, rowIndex, colIndex, column, e) {
        this.showTaskWindow(gridView.getRecord(gridView.findTargetByEvent(e)))
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

    showTaskWindow: function(task) {
        var win = this.getTaskWindow(),
            form = win.down('form');

        if (task !== undefined) {
            win.setTitle('Edit Task');
        }
        else {
            task = Ext.create('Tasks.model.Task');
            win.setTitle('Create Task');
        }

        form.loadRecord(task);
        win.show();
    },

    closeTaskWindow: function() {
        this.getTaskWindow().close();
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