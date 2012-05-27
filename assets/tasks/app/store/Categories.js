Ext.define('Tasks.store.Categories', {
    extend: 'Ext.data.Store',

    model: 'Tasks.model.Category',

    autoLoad: true,
    sorters: 'category'
});