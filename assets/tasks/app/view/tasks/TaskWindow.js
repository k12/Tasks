Ext.define('Tasks.view.tasks.TaskWindow', {
    extend: 'Ext.window.Window',

    xtype: 'taskWindow',

    closeAction: 'hide',
    width: 500,
    height: 350,
    modal: true,
    layout: 'fit',

    initComponent: function() {
        this.items = [
            this.buildForm()
        ];

        this.callParent();
    },

    buildForm: function() {
        return {
            xtype: 'form',
            layout: 'anchor',
            bodyPadding: 10,
            frame: true,
            items: [
                this.buildTitleField(),
                {
                    xtype: 'container',
                    layout: 'hbox',
                    anchor: '100%',
                    margin: '0 0 5',
                    items: [
                        this.buildDueDateField(),
                        this.buildAssignToCombo()
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    anchor: '100%',
                    margin: '0 0 10',
                    items: [
                        this.buildPriorityCombo(),
                        this.buildCategoriesCombo()
                    ]
                },
                this.buildNoteEditor()
            ],

            buttons: [
                {
                    text: 'Save',
                    itemId: 'save-btn',
                    iconCls: 'save-icon'
                },
                {
                    text: 'Cancel',
                    itemId: 'cancel-btn',
                    iconCls: 'cancel-icon'
                }
            ]
        }
    },

    buildTitleField: function() {
        return {
            xtype: 'textfield',
            name: 'title',
            fieldLabel: 'Title*',
            labelWidth: 60,
            anchor: '100%',
            allowBlank: false,
            validateOnBlur: false
        }
    },

    buildDueDateField: function() {
        return {
            xtype: 'datefield',
            name: 'dueDate',
            fieldLabel: 'Due Date',
            labelWidth: 60,
            format: 'Y-m-d',
            emptyText: 'Y-m-d',
            width: 185,
            margin: '0 15 0 0'
        }
    },

    buildAssignToCombo: function() {
        return {
            xtype: 'combobox',
            name: 'assignedToId',
            fieldLabel: 'Assign To',
            labelWidth: 60,
            flex: 1,
            displayField: 'name',
            valueField: 'id',
            store: Ext.create('Tasks.store.Users')
        }
    },

    buildPriorityCombo: function() {
        return {
            xtype: 'combobox',
            name: 'priority',
            fieldLabel: 'Priority',
            labelWidth: 60,
            width: 185,
            margin: '0 15 0 0',
            store: ['None', 'Low', 'Normal', 'High']
        }
    },

    buildCategoriesCombo: function() {
        return {
            xtype: 'combobox',
            name: 'categoryId',
            fieldLabel: 'Category',
            labelWidth: 60,
            flex: 1,
            displayField: 'category',
            valueField: 'id',
            value: 'hui',
            store: Ext.create('Tasks.store.Categories')
        }
    },

    buildNoteEditor: function() {
        return {
            xtype: 'htmleditor',
            name: 'note',
            anchor: '100% -90',
            enableAlignments: false
        }
    }
});