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
            xtype: 'container',
            region: 'west',
            width: 250,
            layout: 'anchor',
            margin: '0 5 0 0',
            items: [
                {
                    xtype: 'viewsGrid',
                    title: 'Views',
                    anchor: '100% 50%'
                },
                {
                    xtype: 'categoriesGrid',
                    title: 'Categories',
                    margin: '5 0 0 0',
                    anchor: '100% 50%'
                }
            ]
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