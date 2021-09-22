var viewport, grid_panel,reporte,store_tipo_trans,store_tipo_icono,store_entidad,store_admin;
get_filtros(null);
Ext.onReady(function () {

    reporte = Ext.create('Ext.data.Store', {
        data: [],
        fields:[
            { name: 'descripcion', type: 'string'},
            { name: 'tipo', type: 'string'},
            { name: 'total_saldo', type: 'string'},
            { name: 'total_tran', type: 'string'},
            { name: 'sucursal', type: 'string'},
            { name: 'transaccionEntidad', type: 'string'}
        ]
    });
    store_admin = Ext.create('Ext.data.Store', {
        data: ADMINS,
        autoLoad:true,
        fields:[
            { name: 'id_admin', type: 'int'},
            { name: 'nombres', type: 'string'}
        ]
    });
    store_tipo_trans = Ext.create('Ext.data.Store', {
        data: TIPOS_TRANSACCION,
        fields: [
            { name: "id_tipo", type: "int" },
            { name: "nombre_tipo", type: "string" }
        ]
    });

    store_tipo_icono = Ext.create('Ext.data.Store', {
        data: TIPO_ICONO,
        fields: [
            { name: "id_icno", type: "int" },
            { name: "icono", type: "string" }
        ]
    });
    store_entidad = Ext.create('Ext.data.Store', {
        data: ENTIDADES,
        fields: [
            { name: "id_entidad", type: "int" },
            { name: "nombre_entidad", type: "string" }
        ]
    });

    grid_panel = Ext.create('Ext.grid.Panel', {
        store: reporte,
        width: 400,
        height: 200,
        region: 'center',
        title: 'Resultado de la busqueda',
        columns: [
            { text: 'Entidad',width: 200,flex: 1,sortable: false,hideable: false,dataIndex: 'transaccionEntidad' },
            { text: 'Sucursal',width: 200,flex: 1,sortable: false,hideable: false,dataIndex: 'sucursal' },
            { text: 'Tipo',flex: 1,width: 160,dataIndex: 'tipo',renderer:formatoTipoTransaccion },
            { text: 'Descripción',flex: 1,width: 160,dataIndex: 'descripcion' },
            { text: 'Saldo total',flex: 1,dataIndex: 'total_saldo' },
            { text: 'Total de transacciones',flex: 1,dataIndex: 'total_tran' }
        ]
    });

    let listeners = {
        // Add the following listener
        collapse: function(field, e){
            if(Ext.isEmpty(field.getRawValue())) {
                field.getStore().clearFilter()
            }
        }
    }

    var filterPanel = Ext.create('Ext.form.Panel', {
        bodyPadding: 10,  // Don't want content to crunch against the borders
        width: 180,
        title: 'Filtros',
        xtype:'form',
        region: 'north',
        collapsible:true,
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        defaults:{
            labelWidth: 130,
            padding:5,
            width:380
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
                queryMode: "local",                
                listeners: listeners
            },
            {
                xtype:'combobox',
                fieldLabel:'Administrador registra',
                store:store_admin,
                displayField: "nombres",
                emptyText: "---------------",
                valueField: "id_admin",
                name: "id_admin",    
                queryMode: "local",             
                listeners: listeners
            },
            {
                xtype:'combobox',
                fieldLabel:'Tipos de icono',
                store:store_tipo_icono,
                displayField: "icono",
                emptyText: "---------------",
                valueField: "id_icono",
                name: "id_icono",   
                queryMode: "local",              
                listeners: listeners
            },
            {
                xtype:'combobox',
                fieldLabel:'Entidades',
                store:store_entidad,
                displayField: "nombre_entidad",
                valueField: "id_entidad",
                name: "id_entidad",
                emptyText: "---------------",   
                queryMode: "local",               
                listeners: listeners
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Fecha de inicio',
                format: 'Y-m-d',
                name:'fecha_inicio'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Fecha fin',
                format: 'Y-m-d',
                name:'fecha_fin'
            }
        ],
        buttons:[
            {
                width:180,
                text:'Buscar',
                handler: function() {
                    obtener_datos_form(filterPanel.getForm().getValues())
                },
                                
            },
            {
                width:180,
                text:'Limpiar',
                handler: function() {
                    filterPanel.getForm().reset()
                },
            }
        ]
    });

    viewport = Ext.create("Ext.container.Viewport", {
        layout: 'border',
        items: [
            filterPanel,
            {
                xtype:'panel',
                layout:'hbox',
                region:'center',
                items:[
                    {
                        xtype:'label',
                        text:'hola'
                    }
                ]
            },
            grid_panel
        ]

    });
});


async function obtener_datos_form(datos=null){
    
    var filtro = {
        "tipo_tran":datos?.id_tipo == null || datos?.id_tipo == "" ? null : datos?.id_tipo ,
        "admin":datos?.id_admin == null || datos?.id_admin == "" ? null : datos?.id_admin,
        "id_entidad": datos?.id_entidad == null || datos?.id_entidad == "" ? null : datos?.id_entidad,
        "fecha_inicio": datos?.fecha_inicio == null || datos?.fecha_inicio == "" ? null : datos?.fecha_inicio,
        "fecha_fin": datos?.fecha_fin == null || datos?.fecha_fin == "" ? null : datos?.fecha_fin,
        'id_icono': datos?.id_icono == null || datos?.id_icono == "" ? null : datos?.id_icono
    }
    let url = _URL + 'report-sucursal';
    var data = await enviar_datos(url, filtro, viewport);
    if(data != -1){
        reporte.loadData(data.resultados.reporte);
    }

}


setTimeout(async function() {
    await obtener_datos_form(datos=null);     
},0500)

