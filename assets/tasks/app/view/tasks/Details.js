Ext.define('Tasks.view.tasks.Details', {
    extend: 'Ext.Panel',

    xtype: 'detailsPanel',

    bodyPadding: 10,

    taskTplMarkup: [
        '<b>{title}</b><br/><br/>',
        '<b>Due date:</b> {dueDate}<br/>',
        '<b>Priority:</b> <span class="{priorityClass}">{priority}</span><br/><br/>',
        '<b>Status:</b> <span class="{statusClass}">{status}</span><br/><br/>',
        '<b>Note:</b> {note}<br/>'
    ],

    startingMarkup: 'Select a task to see details.',

    initComponent: function() {
        this.tpl = Ext.create('Ext.Template', this.taskTplMarkup);
        this.html = this.startingMarkup;

        this.callParent();
    },

    updateDetails: function(data) {
        var tplData = Ext.clone(data);

        tplData['dueDate'] = Ext.Date.format(data['dueDate'], 'Y-m-d');
        tplData['priorityClass'] = 'priority-'+data['priority'].toLowerCase();
        tplData['status'] = (data['done']) ? 'Completed' : 'In progress';
        tplData['statusClass'] = (data['done']) ? 'status-completed' : '';

        this.tpl.overwrite(this.body, tplData);
    }
});