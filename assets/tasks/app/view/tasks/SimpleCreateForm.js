Ext.define('Tasks.view.tasks.SimpleCreateForm', {
    extend: 'Ext.form.Panel',

    xtype: 'simpleCreateForm',

    layout: 'hbox',
    cls: 'simple-create-task-form',

    initComponent: function() {
        this.items = [
            this.buildTitleField(),
            this.buildDueDateField(),
            this.buildCreateButton()
        ];

        this.callParent();
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
            width: 93,
            format: 'Y-m-d',
            emptyText: 'Y-m-d'
        }
    },

    buildCreateButton: function() {
        return {
            xtype: 'button',
            text: 'Create',
            itemId: 'create-btn',
            iconCls: 'create-icon',
            margin: '3 3 0 3',
            width: 68
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