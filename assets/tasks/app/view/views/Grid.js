Ext.define('Tasks.view.views.Grid', {
    extend: 'Ext.grid.Panel',

    xtype: 'viewsGrid',

    hideHeaders: true,

    model: 'View',
    store: 'Views',

    initComponent: function() {
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: '{name}',
            enableGroupingMenu: false
        });

        this.features = [groupingFeature];

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