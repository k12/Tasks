Ext.define('Tasks.view.tasks.TabPanel', {
    extend: 'Ext.tab.Panel',

    xtype: 'tasksTabPanel',

    initComponent: function() {
        this.items = this.buildTabs();
        this.callParent();
    },

    buildTabs: function() {
        return [
            {
                title: 'My Tasks',
                items: [
                    {
                        xtype: 'tasksGrid'
                    }
                ]
            },
            {
                title: 'Assigned',
                items: [
                    {
                        xtype: 'tasksGrid'
                    }
                ]
            }
        ]
    }
});