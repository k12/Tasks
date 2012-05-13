Ext.define('Tasks.model.Task', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',            type: 'int'},
        {name: 'title',         type: 'string'},
        {name: 'dueDate',       type: 'date',       dateFormat: 'Y-m-d'},
        {name: 'priority',      type: 'string',     defaultValue: 'None'},
        {name: 'note',          type: 'string'},
        {name: 'done',          type: 'int'},
        {name: 'categoryId',    type: 'auto',       defaultValue: null}, //FIXIT: type should be int (default null for int doesnt work)
        {name: 'assignedToId',  type: 'auto',       defaultValue: null},
        {name: 'assignedById',  type: 'auto',       defaultValue: null}
    ],

    proxy: {
        type: 'ajax',
        api: {
            create: 'tasks/create',
            read: 'tasks/read',
            update: 'tasks/update'
        },
        reader: {
            type: 'json',
            root: 'tasks',
            successProperty: 'success',
            messageProperty: 'message'
        },
        listeners: {
            exception: function(proxy, response, operation){
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: msg,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }

});