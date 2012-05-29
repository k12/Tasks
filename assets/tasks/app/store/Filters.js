Ext.define('Tasks.store.Filters', {
    extend: 'Ext.data.Store',

    model: 'Tasks.model.Filter',

    groupField: 'type',
    autoLoad: true,

    data : [
        {id: 0, filter: 'All',            type: 'Others'},
        {id: 1, filter: 'Not started',    type: 'State'},
        {id: 2, filter: 'In progress',    type: 'State'},
        {id: 3, filter: 'Completed',      type: 'State'},
        {id: 4, filter: 'Today',          type: 'Due Date'},
        {id: 5, filter: 'Tomorrow',       type: 'Due Date'},
        {id: 6, filter: 'This week',      type: 'Due Date'},
        {id: 7, filter: 'Future',         type: 'Due Date'},
        {id: 8, filter: 'Overdue',        type: 'Due Date'},
        {id: 9, filter: 'Without',        type: 'Due Date'}
    ]
});