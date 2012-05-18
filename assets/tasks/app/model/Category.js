Ext.define('Tasks.model.Category', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',        type: 'int'},
        {name: 'category',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: 'categories/read'
        },
        reader: {
            type: 'json',
            root: 'categories',
            successProperty: 'success',
            messageProperty: 'message'
        }
    }

});