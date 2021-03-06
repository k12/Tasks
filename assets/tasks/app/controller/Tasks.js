Ext.define('Tasks.controller.Tasks', {
    extend: 'Ext.app.Controller',

    models: [
        'Task',
        'User',
        'Filter'
    ],

    stores: [
        'Tasks',
        'Users',
        'Filters'
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
            ref: 'filtersGrid',
            selector: 'filtersGrid'
        },
        {
            ref: 'tasksTabPanel',
            selector: 'tasksTabPanel'
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
                    onStateIconClick: this.onStateIconClick,
                    onPriorityIconClick: this.onPriorityIconClick,
                    onEditIconClick: this.onEditIconClick,
                    onDeleteIconClick: this.onDeleteIconClick,
                    onRecordEdit: this.update
                },
                'tasksTabPanel': {
                    tabchange: this.onTabChange
                },
                'simpleCreateForm textfield': {
                    specialkey: this.onSpecialKey
                },
                'simpleCreateForm #simple-create-btn': {
                    click: this.onSimpleCreateClick
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

    showDetails: function(gridView, task) {
        var panel = this.getDetailsPanel();

        panel.setLoading('Loading...', true);

        //TODO: better errors handling
        task.getAssignedBy({
            success: function(user, operation) {
                task.getAssignedTo({
                    success: function(user, operation) {
                        panel.setLoading(false);
                        panel.updateDetails(task, this.getUsersStore());  //all fields have been loaded - we can show details
                    },
                    failure: function(user, operation) {
                        panel.setLoading(false);
                    },
                    scope: this
                });
            },
            failure: function(user, operation) {
                panel.setLoading(false);
            },
            scope: this
        });
    },

    resetDetails: function(gridView, task) {
        this.getDetailsPanel().resetDetails();
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

    onTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var tasksStore = this.getTasksStore();

        switch(newCard.itemId)
        {
            case 'myTasksTab':
                this.getFiltersGrid().getSelectionModel().select(0); //TODO: fix that static index!
                this.getController('Tasks.controller.Filters').filterTasksGrid('All');
                break;

            case 'assignedTab':
                tasksStore.clearFilter();

                tasksStore.filter({
                    filterFn: function(item) {
                        var assignedBy = item.get('assignedById'),
                            assignedTo = item.get('assignedToId'),
                            state = item.get('state');

                        return (assignedBy != 1 && assignedTo == 1 && state != 'completed');
                    }
                });
                break;
        }
    },

    onSpecialKey: function(field, e) {
        if(e.getKey() === e.ENTER) {
            this.simpleCreate();
        }
    },

    onSimpleCreateClick: function(button, e) {
        this.simpleCreate();
    },

    onSaveClick: function(button, e) {
        var me = this,
            win = me.getTaskWindow(),
            form = win.down('form').getForm(),
            winEl = win.getEl(),
            task = form.getRecord();

        if(form.isValid()) {
            winEl.mask('Saving...');
            form.updateRecord(task);

            task.save({
                success: function(task, operation) {
                    if (!win.taskEdition) {
                        me.getTasksStore().insert(0, task);
                    }
                    else {
                        me.showDetails(null, task);
                    }

                    winEl.unmask();
                    win.close();
                },
                failure: function(task, operation) {
                    var error = operation.getError(),
                        msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                    Ext.MessageBox.show({
                        title: 'Edit Task Failed',
                        msg: msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });

                    winEl.unmask();
                }
            })
        }
        else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
        }
    },

    onCancelClick: function(button, e) {
        this.closeTaskWindow();
    },

    onStateIconClick: function(gridView, rowIndex) {
        this.getTasksGrid().getSelectionModel().select(rowIndex);
        this.changeState(this.getTasksStore().getAt(rowIndex));
    },

    onPriorityIconClick: function(gridView, rowIndex) {
        this.getTasksGrid().getSelectionModel().select(rowIndex);
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
        this.getTasksGrid().getSelectionModel().select(rowIndex);
        this.showTaskWindow(gridView.getRecord(gridView.findTargetByEvent(e)))
    },

    onDeleteClick: function() {
        //TODO: checking if any task is selected
        this.delete(this.getTasksGrid().getSelectionModel().getSelection()[0]);
    },

    onDeleteIconClick: function(gridView, rowIndex, colIndex, column, e) {
        this.getTasksGrid().getSelectionModel().select(rowIndex);
        this.delete(this.getTasksStore().getAt(rowIndex));
    },

    changeState: function(task) {
        var switchMap = { 'not started': 'in progress', 'in progress': 'completed', 'completed': 'not started' };

        task.set('state', switchMap[task.get('state')]);
        this.update(task);
    },

    changePriority: function(task) {
        var switchMap = { 'none': 'low', 'low': 'normal', 'normal': 'high', 'high': 'none' };

        task.set('priority', switchMap[task.get('priority')]);
        this.update(task);
    },

    showTaskWindow: function(task) {
        var win = this.getTaskWindow(),
            form = win.down('form'),
            basicForm = form.getForm();

        if (task !== undefined) {
            win.setTitle('Edit Task');
            win.taskEdition = true;
        }
        else {
            task = Ext.create('Tasks.model.Task');

            win.setTitle('Create Task');
            win.taskEdition = false;

            basicForm.findField('title').reset();
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

                    me.getFiltersGrid().getSelectionModel().select(0); //TODO: fix that static index! (select All filter)

                    titleField.reset();
                    titleField.focus();

                    formEl.unmask();
                },
                failure: function(task, operation) {
                    var error = operation.getError(),
                        msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                    Ext.MessageBox.show({
                        title: 'Create Task Failed',
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

        if(task.get('state') == 'completed') {
            task.set('completedAt', Ext.Date.format(new Date(), 'Y-m-d'));
        } else {
            task.set('completedAt', null);
        }

        task.save({
            success: function(task, operation) {
                user = me.getUsersStore().getById(task.get('assignedToId'));

               // task.setAssignedTo(user.get('id'));
      //console.log(task);


                me.showDetails(null, task);
                me.getTasksGrid().refreshFilters();
            },
            failure: function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Update Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },

    delete: function(task) {
        var me = this;

        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure you want to delete this task?',
            buttons: Ext.Msg.YESNO,
            fn: function(response) {
                if(response === 'yes') {
                    task.destroy({
                        success: function(task, operation) {
                            me.getTasksStore().remove(task);
                            me.resetDetails();
                        },
                        failure: function(task, operation) {
                            var error = operation.getError(),
                                msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                            Ext.MessageBox.show({
                                title: 'Delete Task Failed',
                                msg: msg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            }
        });
    }
});