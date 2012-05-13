Ext.define('Tasks.view.tasks.SimpleCreateForm', {
    extend: 'Ext.form.Panel',

    xtype: 'simpleCreateForm',

    layout: 'hbox',
    cls: 'simple-create-task-form',

    initComponent: function() {
        this.items = [
            this.buildCreateIcon(),
            this.buildTitleField(),
            this.buildDueDateField()
        ];

        this.callParent(arguments);
    },

    buildCreateIcon: function() {
        return {
            xtype: 'component',
            cls: 'create-icon',
            width: 24,
            height: 24
        }
    },

    buildTitleField: function() {
        return {
            xtype: 'textfield',
            name: 'title',
            flex: 1,
            emptyText: 'What to do, sir?',
            allowBlank: false,
            validateOnBlur: false
        }
    },

    buildDueDateField: function() {
        return {
            xtype: 'datefield',
            name: 'dueDate',
            width: 167,
            format: 'Y-m-d',
            emptyText: 'Y-m-d'
        }
    },

    blurInputs: function() {
        this.items.each(function(item) {
            var inputEl = item.getEl().down('input');

            if(inputEl) {
                inputEl.blur();
            }
        });
    }

});