Ext.define('Tasks.store.Filters', {
    extend: 'Ext.data.Store',

    model: 'Tasks.model.Filter',

    groupField: 'type',
    autoLoad: true,

    data : [
        {filter: 'All',            type: 'Active'},
        {filter: 'Created By Me',  type: 'Active'},
        {filter: 'Assigned To Me', type: 'Active'},
        {filter: 'Without',        type: 'Due Date'},
        {filter: 'Overdue',        type: 'Due Date'},
        {filter: 'Today',          type: 'Due Date'},
        {filter: 'Tomorrow',       type: 'Due Date'},
        {filter: 'This Week',      type: 'Due Date'},
        {filter: 'Future',         type: 'Due Date'},
        {filter: 'Not Started',    type: 'State'},
        {filter: 'In Progress',    type: 'State'},
        {filter: 'Completed',      type: 'State'}
    ]
});