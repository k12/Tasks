Ext.define('Tasks.view.views.Grid', {
    extend: 'Ext.grid.Panel',

    xtype: 'viewsGrid',

    hideHeaders: true,

    model: 'View',
    store: 'Views',

    initComponent: function() {
        this.columns = {
            items: [
                this.buildViewColumn()
            ]
        };

        this.callParent();
    },

    buildViewColumn: function() {
        return {
            header: 'View',
            dataIndex: 'view',
            flex: 1
        };
    }
});