Ext.define('Tasks.controller.Filters', {
    extend: 'Ext.app.Controller',

    models: [
        'Task',
        'User',
        'Filter'
    ],

    stores: [
        'Tasks',
        'Users',
        'Filters'
    ],

    views: [
        'filters.Grid'
    ],

    refs: [
        {
            ref: 'filtersGrid',
            selector: 'filtersGrid'
        }
    ],

    init: function() {
        this.control(
            {
                'filtersGrid': {
                    select: this.filterTasksGrid,
                    afterrender: this.onAfterRender
                }
            }
        );
    },

    onAfterRender: function(filtersGrid) {
        filtersGrid.getSelectionModel().select(0); //TODO: fix that static index!
    },

    filterTasksGrid: function(rowModel, record, index, eOpts) {
        var tasksStore = this.getTasksStore(),
            now = Ext.Date.clearTime(new Date());

        tasksStore.clearFilter();

        switch (record.get('filter').toLowerCase()) {
            case 'all':
                tasksStore.filter({
                    filterFn: function(item) {
                        var state = item.get('state');
                            return (state != 'completed');
                    }
                });
                break;
            case 'created by me':
                tasksStore.filter({
                    filterFn: function(item) {
                        var creatorId = item.get('createdById'),
                            state = item.get('state');

                        return (creatorId == 1 && state != 'completed');
                    }
                });
                break;
            case 'assigned to me':
                tasksStore.filter({
                    filterFn: function(item) {
                        var assignedToId = item.get('assignedToId'),
                            state = item.get('state');

                        return (assignedToId == 1 && state != 'completed');
                    }
                });
                break;
            case 'not started':
                tasksStore.filter('state', 'not started');
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
                        var dueDate = item.get('dueDate'),
                            state = item.get('state');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate) > now && state != 'completed');
                        }

                        return false;
                    }
                });
                break;
            case 'overdue':
                tasksStore.filter({
                    filterFn: function(item) {
                        var dueDate = item.get('dueDate'),
                            state = item.get('state');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate) < now && state != 'completed');
                        }

                        return false;
                    }
                });
                break;
            case 'this week':
                tasksStore.filter({
                    filterFn: function(item) {
                        //TODO: temporary solution +7 days - fix it!
                        var dueDate = item.get('dueDate'),
                            state = item.get('state');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate) < Ext.Date.add(now, Ext.Date.DAY, 7)  && state != 'completed');
                        }

                        return false;
                    }
                });
                break;
            case 'today':
                tasksStore.filter({
                    filterFn: function(item) {
                        var dueDate = item.get('dueDate'),
                            state = item.get('state');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate).getTime() === now.getTime() && state != 'completed');
                        }

                        return false;
                    }
                });
                break;
            case 'tomorrow':
                tasksStore.filter({
                    filterFn: function(item) {
                        var dueDate = item.get('dueDate'),
                            state = item.get('state');

                        if (dueDate != null)
                        {
                            return (Ext.Date.clearTime(dueDate).getTime() === Ext.Date.add(now, Ext.Date.DAY, 1).getTime() && state != 'completed');
                        }

                        return false;
                    }
                });
                break;
            case 'without': //without due date
                tasksStore.filter({
                    filterFn: function(item) {
                        var dueDate = item.get('dueDate'),
                            state = item.get('state');

                        return (dueDate == null && state != 'completed');
                    }
                });
                break;

            default:
                return false;
        }
    }
});