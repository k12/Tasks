Ext.define('Tasks.store.Tasks', {
    extend: 'Ext.data.Store',

    model: 'Tasks.model.Task',

    filters: [{
        property: 'state',
        value: 'in progress'
    }],

    autoLoad: true

});
