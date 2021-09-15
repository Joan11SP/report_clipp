var viewport, grid_panel;
get_filtros();

Ext.onReady(function () {

    var userStore = Ext.create('Ext.data.Store', {
        data: [
            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
            { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
            { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
            { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
        ]
    });
    var store_tipo_trans = Ext.create('Ext.data.Store', {
        data: TIPOS_TRANSACCION,
        fields: [
            { name: "id_tipo", type: "int" },
            { name: "nombre_tipo", type: "string" }
        ]
    });

    grid_panel = Ext.create('Ext.grid.Panel', {
        store: userStore,
        width: 400,
        height: 200,
        region: 'center',
        title: 'Application Users',
        columns: [
            {
                text: 'Entidad',
                width: 120,
                sortable: false,
                hideable: false,
                dataIndex: 'transaccionEntidad'
            },
            {
                text: 'Tipo',
                width: 150,
                dataIndex: 'tipo'
            },
            {
                text: 'Descripción',
                flex: 1,
                dataIndex: 'descripcion'
            },
            {
                text: 'Saldo total',
                flex: 1,
                dataIndex: 'total_saldo'
            },
            {
                text: 'Total de transacciones',
                flex: 1,
                dataIndex: 'total_tran'
            }
        ]
    });

    var filterPanel = Ext.create('Ext.panel.Panel', {
        bodyPadding: 10,  // Don't want content to crunch against the borders
        width: 300,
        title: 'Filters',
        region: 'north',
        layout: {
            type: 'hbox',
            align: 'stretch',
            pack: 'center'
        },
        defaults:{
            labelWidth: 130,
            padding:5
        },
        items: [
            {
                xtype:'combobox',
                fieldLabel:'Tipos de transacción',
                store:store_tipo_trans,
                displayField: "nombre_tipo",
                valueField: "id_tipo",
                name: "id_tipo",
                emptyText: "---------------",
                value:'nombre_tipo',
                queryMode: "local",
            },
            {
                xtype:'combobox',
                fieldLabel:'Administrador registra'
            },
            {
                xtype:'combobox',
                fieldLabel:'Tipos de icono',
                store:TIPO_ICONO
            },
            {
                xtype:'combobox',
                fieldLabel:'Entidades',
                store:ENTIDADES
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Fecha de inicio'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Fecha fin'
            }
        ]
    });

    viewport = Ext.create("Ext.container.Viewport", {
        layout: 'border',
        items: [
            filterPanel,
            grid_panel
        ]

    });
});

