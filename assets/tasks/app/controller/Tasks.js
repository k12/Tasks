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
        'tasks.SimpleCreateForm',
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
            ref: 'simpleCreateForm',
            selector: 'simpleCreateForm'
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
                'simpleCreateForm textfield': {
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
            this.simpleCreate();
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

    changePriority: function(task) {
        var switchMap = { 'None': 'Low', 'Low': 'Normal', 'Normal': 'High', 'High': 'None' };

        task.set('priority', switchMap[task.data['priority']]);
        this.update(task);
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

    simpleCreate: function() {
        var me = this,
            form = me.getSimpleCreateForm(),
            basicForm = form.getForm(),
            formEl = form.getEl(),
            titleField = basicForm.findField('title'),
            task = Ext.create('Tasks.model.Task');

        if (basicForm.isValid())
        {
            basicForm.updateRecord(task);
            form.blurInputs();

            formEl.mask('Saving...');

            task.save({
                success: function(task, operation) {
                    me.getTasksStore().insert(0, task);

                    titleField.reset();
                    titleField.focus();

                    formEl.unmask();
                },
                failure: function(task, operation) {
                    var error = operation.getError(),
                        msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                    Ext.MessageBox.show({
                        title: 'Creating Task Failed',
                        msg: msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });

                    formEl.unmask();
                }
            });
        }
    },

    update: function(task) {
        var me = this;

        task.save({
            success: function(task, operation) {
                me.showDetails(null, task);
            },
            failure: function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Updating Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
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