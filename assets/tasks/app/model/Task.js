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
            read: 'tasks/read'
        },
        reader: {
            type: 'json',
            root: 'tasks',
            successProperty: 'success',
            messageProperty: 'message'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: 'Status Code: ' + response.status + ' ' + response.statusText + '<br /> Error Message: ' + operation.error,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }

});