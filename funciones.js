var ENTIDADES, TIPOS_TRANSACCION, TIPO_ICONO
function get_recurso(url,data=null,callback){
    Ext.Ajax.request({
        url: url,
        method:'POST',
        jsonData:data,
        success: function(response, opts) {
            var obj = Ext.decode(response.responseText);
            return callback(obj)
        },
   
        failure: function(response, opts) {
            var obj = Ext.decode(response.responseText);
            return callback(-1)
        }
    });
}


function get_filtros(){

    url =_URL + 'datos-filtros';
    get_recurso(url,null,function(res){
        ENTIDADES = res.resultados.entidades;
        TIPOS_TRANSACCION = res.resultados.tipos_tran;
        console.log(res.resultados.tipos_tran)
        TIPO_ICONO = res.resultados.iconos;
    });

}