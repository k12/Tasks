Ext.define('Tasks.model.Category', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',    type: 'int'},
        {name: 'name',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: 'assets/tasks/data/categories.json'
        },
        reader: {
            type: 'json',
            root: 'categories',
            successProperty: 'success',
            messageProperty: 'message'
        }
    }

});