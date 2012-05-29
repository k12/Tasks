Ext.define('Tasks.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'border',

    requires: [
        'Tasks.view.Toolbar'
    ],

    initComponent: function() {
        this.items = [
            this.buildNorthRegion(),
            this.buildWestRegion(),
            this.buildCenterRegion(),
            this.buildEastRegion()
        ]

        this.callParent();
    },

    buildNorthRegion: function() {
        return {
            xtype: 'tasksToolbar',
            region: 'north'
        }
    },

    buildWestRegion: function() {
        return {
            xtype: 'filtersGrid',
            region: 'west',
            title: 'Filters',
            width: 250,
            margin: '0 5 0 0'
        }
    },

    buildCenterRegion: function() {
        return {
            xtype: 'tasksTabPanel',
            region: 'center'
        }
    },

    buildEastRegion: function() {
        return {
            xtype: 'detailsPanel',
            region: 'east',
            title: 'Details',
            width: 300,
            collapsible: true,
            split: true
        }
    }

});