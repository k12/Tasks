Ext.define('Tasks.view.tasks.Grid', {
    extend: 'Ext.grid.Panel',

    xtype: 'tasksGrid',

    title: 'Tasks',
    multiSelect: true,
    enableColumnHide: false,

    initComponent: function() {
        this.columns = {
            items: [
                //TODO: configure columns
            ]
        };

        this.callParent();
    }
});