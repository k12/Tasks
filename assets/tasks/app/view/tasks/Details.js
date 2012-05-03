Ext.define('Tasks.view.tasks.Details', {
    extend: 'Ext.Panel',

    xtype: 'detailsPanel',

    bodyPadding: 10,

    taskTplMarkup: [
        '<b>Title:</b> {title}<br/><br/>',
        '<b>Due date:</b> {dueDate}<br/>',
        '<b>Priority:</b> {priority}<br/><br/>',
        '<b>Note:</b> {note}<br/>'
    ],

    startingMarkup: 'Select a task to see details.',

    initComponent: function() {
        this.tpl = Ext.create('Ext.Template', this.taskTplMarkup);
        this.html = this.startingMarkup;

        this.callParent();
    },

    updateDetails: function(data) {
        var dueDate = data['dueDate']; //save data['dueDate'] to restore it later

        data['dueDate'] = Ext.Date.format(dueDate, 'Y-m-d');
        this.tpl.overwrite(this.body, data);

        data['dueDate'] = dueDate; //restore dueDate
    }
});