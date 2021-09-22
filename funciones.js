var ENTIDADES, TIPOS_TRANSACCION, TIPO_ICONO,ADMINS, loading = null;
async function enviar_datos (url,data,panel){
    panel != null ? mostrarLoading(panel) : null;
    data = data != null ? data : {'id':1}
    try {
        var res = await fetch(url,{ method: 'POST', body:JSON.stringify(data), headers:{ 'content-type': 'application/json' } })
        var datos = await res.json();
        panel != null ? esconder_loading() : null;
        return datos
    } catch (error) {
        panel != null ? esconder_loading() : null;
        mostrar_mensaje("Ocurrió un error, intenta nuevamente más tarde.")
        return -1;
    }
}

async function get_filtros(panel){

    url =_URL + 'datos-filtros';
    try {
        Ext.Ajax.request({
            async:false,
            url: url,
            method:'POST',
            timeout:50000,
            header:{ 'content-type': 'application/json' },
            success: function(response, opts) {
                //panel != null ? esconder_loading() : null;
                var obj = Ext.decode(response.responseText);
                var datos = obj.resultados
                console.log(datos);
                if(datos != null){
                    ENTIDADES = datos.entidades;
                    TIPOS_TRANSACCION = datos.tipos_tran;
                    TIPO_ICONO = datos.iconos;
                    ADMINS = datos.admin;        
                }
            },   
            failure: function(response, opts) {
                //panel != null ? esconder_loading() : null;
                var obj = Ext.decode(response.responseText);
                return -1
            }
        });
    } catch (error) {
        return -1;
    }
}



function mostrarLoading(panel){

    loading = new Ext.LoadMask({
        msg    : 'Cargando...',
        target : panel
    });
    loading.show();
}
function esconder_loading(){
    loading.hide();
}
function formatoTipoTransaccion(estado,value,record) {
    var htmlEstado = '';
    if (record.data.tipo == "INGRESO") {
        htmlEstado = '<span style="color:green;">' + record.data.tipo + '</span>';
    } else {
        htmlEstado = '<span style="color:red;">' + record.data.tipo + '</span>';
    }
    return htmlEstado;
}

function mostrar_mensaje(msg) {
    Ext.toast(msg); 
}