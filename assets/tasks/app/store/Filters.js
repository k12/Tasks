Ext.define('Tasks.store.Filters', {
    extend: 'Ext.data.Store',

    model: 'Tasks.model.Filter',

    groupField: 'type',
    autoLoad: true,

    data : [
        {filter: 'All',            type: 'Others'},
        {filter: 'Without',        type: 'Due Date'},
        {filter: 'Overdue',        type: 'Due Date'},
        {filter: 'Today',          type: 'Due Date'},
        {filter: 'Tomorrow',       type: 'Due Date'},
        {filter: 'This week',      type: 'Due Date'},
        {filter: 'Future',         type: 'Due Date'},
        {filter: 'Not started',    type: 'State'},
        {filter: 'In progress',    type: 'State'},
        {filter: 'Completed',      type: 'State'}
    ]
});