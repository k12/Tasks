Ext.define('Tasks.model.Task', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',       type: 'int'},
        {name: 'title',    type: 'string'},
        {name: 'dueDate',  type: 'date'}
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: 'assets/tasks/data/tasks.json'
        },
        reader: {
            type: 'json',
            root: 'tasks',
            successProperty: 'success',
            messageProperty: 'message'
        }
    }

});