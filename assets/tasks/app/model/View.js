Ext.define('Tasks.model.View', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',        type: 'int'},
        {name: 'view',      type: 'string'},
        {name: 'type',      type: 'string'}
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
