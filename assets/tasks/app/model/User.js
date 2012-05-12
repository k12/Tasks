Ext.define('Tasks.model.User', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',    type: 'int'},
        {name: 'name',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: 'assets/tasks/data/users.json'
        },
        reader: {
            type: 'json',
            root: 'users',
            successProperty: 'success',
            messageProperty: 'message'
        }
    }

});