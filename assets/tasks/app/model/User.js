Ext.define('Tasks.model.User', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',    type: 'int'},
        {name: 'name',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: 'users/read'
        },
        reader: {
            type: 'json',
            root: 'users',
            successProperty: 'success',
            messageProperty: 'message'
        }
    }

});