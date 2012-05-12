Ext.define('Tasks.model.Task', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',            type: 'int'},
        {name: 'title',         type: 'string'},
        {name: 'dueDate',       type: 'date',       dateFormat: 'Y-m-d'},
        {name: 'priority',      type: 'string',     defaultValue: 'None'},
        {name: 'note',          type: 'string'},
        {name: 'done',          type: 'boolean',    defaultValue: false},
        {name: 'categoryId',    type: 'int'},
        {name: 'assignedToId',  type: 'int'},
        {name: 'assignedById',  type: 'int'}
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