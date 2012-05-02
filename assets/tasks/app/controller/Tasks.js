Ext.define('Tasks.controller.Tasks', {
    extend: 'Ext.app.Controller',

    models: ['Task'],
    stores: ['Tasks'],

    views: [
        'tasks.TabPanel',
        'tasks.Grid',
        'tasks.Details'
    ],

    init: function() {

    }
});