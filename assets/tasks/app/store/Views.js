Ext.define('Tasks.store.Views', {
    extend: 'Ext.data.Store',

    model: 'Tasks.model.View',

    groupField: 'type',
    autoLoad: true,

    data : [
        {id: 0, view: 'All',            type: 'Others'},
        {id: 1, view: 'Not started',    type: 'State'},
        {id: 2, view: 'In progress',    type: 'State'},
        {id: 3, view: 'Completed',      type: 'State'},
        {id: 4, view: 'Today',          type: 'Due Date'},
        {id: 5, view: 'Tomorrow',       type: 'Due Date'},
        {id: 6, view: 'This week',      type: 'Due Date'},
        {id: 7, view: 'Future',         type: 'Due Date'},
        {id: 8, view: 'Overdue',        type: 'Due Date'},
        {id: 9, view: 'Without',        type: 'Due Date'}
    ]
});