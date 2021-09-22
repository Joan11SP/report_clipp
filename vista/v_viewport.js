

var _filtro = viewport.filterPanel
var _grid = viewport.grid_panel
Ext.onReady(function () {


    Ext.create("Ext.container.Viewport", {
        layout: 'border',
        items: [
            {
                region: 'west',
                collapsible: true,
                title: 'Navegación',
                width: 190,
                split: true,
                items: [
                    {
                        xtype: 'menu',
                        width: 190,
                        plain: true,
                        floating: false,
                        showSeparator: true,

                        items: [
                            {
                                text: 'Reporte de transaciones'
                            }, 
                            {
                                xtype: 'menuseparator'
                            }, 
                            {
                                text: 'Reporte de transaciones de Sucursal'
                            }
                        ]
                    }
                ],
                listeners:{

                }

            },
            {
                region: 'center',
                xtype: 'panel',
                width:1000,
                items: [
                    _filtro,
                    _grid
                ]
            }
        ]

    });
});