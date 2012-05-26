Ext.define('Tasks.store.Views', {
    extend: 'Ext.data.Store',

    model: 'Tasks.model.View',

    autoLoad: true,

    data : [
        {id: 1, view: 'Assigned'},
        {id: 2, view: 'In progress'},
        {id: 3, view: 'Overdue'},
        {id: 4, view: 'Today'},
        {id: 5, view: 'Tomorrow'},
        {id: 6, view: 'This week'},
        {id: 7, view: 'Future'},
        {id: 8, view: 'Completed'}
    ]
});