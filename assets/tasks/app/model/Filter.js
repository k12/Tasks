Ext.define('Tasks.model.Filter', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',        type: 'int'},
        {name: 'filter',    type: 'string'},
        {name: 'type',      type: 'string'}
    ]

});
