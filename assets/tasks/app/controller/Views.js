Ext.define('Tasks.controller.Views', {
    extend: 'Ext.app.Controller',

    models: [
        'Task',
        'User',
        'View'
    ],

    stores: [
        'Tasks',
        'Users',
        'Views'
    ],

    views: [
        'views.Grid'
    ],

    refs: [
        {
            ref: 'viewsGrid',
            selector: 'viewsGrid'
        }
    ],

    init: function() {
        this.control(
            {
                'viewsGrid': {
                    select: this.filterTasksGrid
                }
            }
        );
    },

    filterTasksGrid: function(rowModel, record, index, eOpts) {
        var tasksStore = this.getTasksStore(),
            now = Ext.Date.clearTime(new Date());

        tasksStore.clearFilter();

        switch (record.get('view').toLowerCase()) {
            case 'assigned':
                tasksStore.filter('state', 'assigned');
                break;
            case 'in progress':
                tasksStore.filter('state', 'in progress');
                break;
            case 'completed':
                tasksStore.filter('state', 'completed');
                break;
            case 'future':
                tasksStore.filter({
                    filterFn: function(item) {
                        var dueDate = item.get('dueDate');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate) > now);
                        }

                        return false;
                    }
                });
                break;
            case 'overdue':
                tasksStore.filter({
                    filterFn: function(item) {
                        var dueDate = item.get('dueDate');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate) < now);
                        }

                        return false;
                    }
                });
                break;
            case 'this week':
                tasksStore.filter({
                    filterFn: function(item) {
                        //TODO: temporary solution +7 days - fix it!
                        var dueDate = item.get('dueDate');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate) < Ext.Date.add(now, Ext.Date.DAY, 7));
                        }

                        return false;
                    }
                });
                break;
            case 'today':
                tasksStore.filter({
                    filterFn: function(item) {
                        var dueDate = item.get('dueDate');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate).getTime() === now.getTime());
                        }

                        return false;
                    }
                });
                break;
            case 'tomorrow':
                tasksStore.filter({
                    filterFn: function(item) {
                        var dueDate = item.get('dueDate');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate).getTime() === Ext.Date.add(now, Ext.Date.DAY, 1).getTime());
                        }

                        return false;
                    }
                });
                break;
        }
    }
});