Ext.define('Tasks.view.tasks.Grid', {
    extend: 'Ext.grid.Panel',

    xtype: 'tasksGrid',

    enableColumnHide: false,
    enableColumnResize: false,

    model: 'Task',

    store: 'Tasks',

    initComponent: function() {
        this.columns = {
            items: [
                this.buildStateColumn(),
                this.buildTaskColumn(),
                this.buildAssignedByColumn(),
                this.buildAssignedToColumn(),
                this.buildDueDateColumn(),
                this.buildPriorityColumn(),
                this.buildEditTaskColumn(),
                this.buildDeleteTaskColumn()
            ]
        };

        this.dockedItems = [
            this.buildCreateTaskForm()
        ],

        this.viewConfig = {
            getRowClass: Ext.bind(this.getRowClass, this)
        },

        this.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                listeners: {
                    edit: Ext.bind(this.onCellEdit, this)
                }
            })
        ];

        this.callParent();

        this.addEvents(
            'onStateIconClick',
            'onPriorityIconClick',
            'onEditIconClick',
            'onDeleteIconClick'
        );
    },

    buildStateColumn: function() {
        return {
            xtype: 'actioncolumn',
            dataIndex: 'state',
            width: 24,
            sortable: false,
            align: 'center',
            cls: 'column-header-icon task-state-header-icon',
            handler: Ext.bind(this.onStateIconClick, this),
            getClass: this.getStateColumnClass
        };
    },

    buildTaskColumn: function() {
        return {
            header: 'Task',
            dataIndex: 'title',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        };
    },

    buildAssignedByColumn: function() {
        return {
            header: 'Assigned By',
            dataIndex: 'assignedById',
            renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                return record.getAssignedBy().get('name');
            }
        }
    },

    buildAssignedToColumn: function() {
        return {
            header: 'Assigned To',
            dataIndex: 'assignedToId',
            hidden: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                return record.getAssignedTo().get('name');
            }
        }
    },

    buildDueDateColumn: function() {
        return {
            xtype: 'datecolumn',
            header: 'Due Date',
            dataIndex: 'dueDate',
            format: 'Y-m-d',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d',
                emptyText: 'Y-m-d'
            }
        };
    },

    buildPriorityColumn: function() {
        return {
            xtype: 'actioncolumn',
            dataIndex: 'priority',
            width: 24,
            sortable: false,
            align: 'center',
            cls: 'column-header-icon priority-icon',
            handler: Ext.bind(this.onPriorityIconClick, this),
            getClass: this.getPriorityColumnClass
        };
    },

    buildEditTaskColumn: function() {
        return {
            xtype: 'actioncolumn',
            width: 24,
            sortable: false,
            align: 'center',
            cls: 'column-header-icon edit-task-icon',
            iconCls: 'x-hidden can-be-hidden edit-task-icon',
            handler: Ext.bind(this.onEditIconClick, this)
        };
    },

    buildDeleteTaskColumn: function() {
        return {
            xtype: 'actioncolumn',
            width: 24,
            sortable: false,
            align: 'center',
            cls: 'column-header-icon delete-icon',
            iconCls: 'x-hidden can-be-hidden delete-icon',
            handler: Ext.bind(this.onDeleteIconClick, this)
        };
    },

    buildCreateTaskForm: function() {
        return {
            xtype: 'simpleCreateForm',
            dock: 'top',
            //weight: 101,
            bodyStyle: {
                'background-color': '#E4E5E7'
            }
        };
    },

    onCellEdit: function(editor, e) {
        this.fireEvent('onRecordEdit', e.record);
    },

    onStateIconClick: function(gridView, rowIndex, colIndex, column, e) {
        this.fireEvent('onStateIconClick', gridView, rowIndex, colIndex, column, e);
    },

    onPriorityIconClick: function(gridView, rowIndex, colIndex, column, e) {
        this.fireEvent('onPriorityIconClick', gridView, rowIndex, colIndex, column, e);
    },

    onEditIconClick: function(gridView, rowIndex, colIndex, column, e) {
        this.fireEvent('onEditIconClick', gridView, rowIndex, colIndex, column, e);
    },

    onDeleteIconClick: function(gridView, rowIndex, colIndex, column, e) {
        this.fireEvent('onDeleteIconClick', gridView, rowIndex, colIndex, column, e);
    },

    getStateColumnClass: function(v, metaData, record) {
        var state = record.data['state'].toLowerCase().replace(' ', '-');

        return 'task-' + state + '-icon';
    },

    getPriorityColumnClass: function(v, metaData, record) {
        var priority = record.data['priority'].toLowerCase();

        return 'priority-' + priority + '-icon';
    },

    getRowClass: function(record, rowIndex, rowParams, store){
        var dueDate = record.get('dueDate');

        if (record.get('state') == 'completed') {
            return 'tasks-completed-task';
        }
        else if (dueDate && (dueDate < Ext.Date.clearTime(new Date()))) {
            return 'tasks-overdue-task';
        }
    },

    refreshFilters: function() {
        var store = this.store,
            filters = store.filters;

        // save a reference to the existing task filters before clearing them
        filters = filters.getRange(0, filters.getCount() - 1);

        // clear the tasks store's filters and reapply them.
        store.clearFilter();
        store.filter(filters);
    },
});