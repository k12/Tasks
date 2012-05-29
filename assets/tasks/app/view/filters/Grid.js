Ext.define('Tasks.view.filters.Grid', {
    extend: 'Ext.grid.Panel',

    xtype: 'filtersGrid',

    hideHeaders: true,

    model: 'Filter',
    store: 'Filters',

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
            header: 'Filter',
            dataIndex: 'filter',
            flex: 1
        };
    }
});