Ext.define('Tasks.view.tasks.Grid', {
    extend: 'Ext.grid.Panel',

    xtype: 'tasksGrid',

    multiSelect: true,

    enableColumnHide: false,
    enableColumnResize: false,

    model: 'Task',
    store: 'Tasks',

    initComponent: function() {
        this.columns = {
            items: [
                this.buildTitleColumn(),
                this.buildDueDateColumn(),
                this.buildPriorityColumn(),
                this.buildEditTaskColumn(),
                this.buildDeleteTaskColumn()
            ]
        };

        this.callParent();
    },

    buildTitleColumn: function() {
        return {
            header: 'Title',
            dataIndex: 'title',
            flex: 1
        };
    },

    buildDueDateColumn: function() {
        return {
            xtype: 'datecolumn',
            header: 'Due Date',
            dataIndex: 'dueDate',
            format: 'Y-m-d'
        };
    },

    buildPriorityColumn: function() {
        return {
            xtype: 'actioncolumn',
            width: 24,
            sortable: false,
            align: 'center',
            cls: 'column-header-icon priority-icon',
            icon: 'public/images/icons/priority_normal.png',
            tooltip: 'Priority: normal'
        };
    },

    buildEditTaskColumn: function() {
        return {
            xtype: 'actioncolumn',
            width: 24,
            sortable: false,
            align: 'center',
            cls: 'column-header-icon edit-task-icon',
            iconCls: 'x-hidden',
            icon: 'public/images/icons/edit.png',
            tooltip: 'Edit'
        };
    },

    buildDeleteTaskColumn: function() {
        return {
            xtype: 'actioncolumn',
            width: 24,
            sortable: false,
            align: 'center',
            cls: 'column-header-icon delete-icon',
            iconCls: 'x-hidden',
            icon: 'public/images/icons/delete.png',
            tooltip: 'Delete'
        };
    }
});