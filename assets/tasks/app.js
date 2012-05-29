Ext.onReady(function(){

    Ext.Loader.setConfig({
        enabled: true
    });

    Ext.application({
        name: 'Tasks',
        appFolder: 'assets/tasks/app',
        autoCreateViewport: true,

        controllers: [
            'Filters',
            'Categories',
            'Tasks'
        ]
    });

});