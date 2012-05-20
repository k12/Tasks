Ext.define('Tasks.model.Category', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',        type: 'int'},
        {name: 'category',  type: 'string'},
        {name: 'editable',  type: 'int',     defaultValue: '1'}
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