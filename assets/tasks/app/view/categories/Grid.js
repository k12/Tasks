Ext.define('Tasks.view.categories.Grid', {
    extend: 'Ext.grid.Panel',

    xtype: 'categoriesGrid',

    hideHeaders: true,

    model: 'Category',
    store: 'Categories',

    initComponent: function() {
        this.columns = {
            items: [
                this.buildCategoryColumn()
            ]
        };

        this.callParent();
    },

    buildCategoryColumn: function() {
        return {
            header: 'Category',
            dataIndex: 'category',
            flex: 1
        };
    }
});