Ext.define('Tasks.view.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',

    xtype: 'tasksToolbar',

    initComponent: function() {
        this.items = [
            {
                text: 'Create',
                iconCls: 'create-icon',
                id: 'create-task-btn'
            },
            {
                text: 'Edit',
                iconCls: 'edit-tb-icon',
                id: 'edit-task-btn',
                disabled: true
            },
            {
                text: 'Delete',
                iconCls: 'delete-tb-icon',
                id: 'delete-task-btn',
                disabled: true
            }
        ]

        this.callParent();
    }

});