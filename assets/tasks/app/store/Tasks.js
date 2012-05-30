Ext.define('Tasks.store.Tasks', {
    extend: 'Ext.data.Store',

    model: 'Tasks.model.Task',

    sorters: 'dueDate',
    autoLoad: true
});
