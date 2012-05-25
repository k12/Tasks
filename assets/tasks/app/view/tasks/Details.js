Ext.define('Tasks.view.tasks.Details', {
    extend: 'Ext.Panel',

    xtype: 'detailsPanel',

    bodyPadding: 10,

    taskTplMarkup: [
        '<b>{title}</b><br/><br/>',
        '<b>Due date:</b> {dueDate}<br/>',
        '<b>Priority:</b> <span class="{priorityClass}">{priority}</span><br/><br/>',
        '<b>State:</b> <span class="{stateClass}">{state}</span><br/>',
        '{completedAt}',
        '<b>Note:</b><br/> {note}<br/>'
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
        tplData['priorityClass'] = 'priority-'+data['priority'];
        tplData['state'] = data['state'];
        tplData['stateClass'] = 'state-'+data['state'].replace(' ','-');
        tplData['completedAt'] = (data['completedAt'] != null) ? '<b>Completed at:</b> '+Ext.Date.format(data['completedAt'], 'Y-m-d')+'<br/><br/>' : '<br/>';

        this.tpl.overwrite(this.body, tplData);
    },

    resetDetails: function() {
        this.update(this.startingMarkup);
    }
});