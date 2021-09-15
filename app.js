/* global Ext */
Ext.application({
    name: 'BootCoop',
    appFolder: 'app',
    requires: [
        'BootCoop.view.main.v_Main',
        'BootCoop.view.main.c_Main',
        'BootCoop.view.main.MainContainerWrap',
        'BootCoop.view.main.MainModel'
    ],
    stores: [
        'Navegacion',
        //STORES ADMINISTRADOR
        'administrador.s_Administrador',
        'administrador.s_Modulos',
        'entidad.s_entidad'
    ],
    mainView: 'BootCoop.view.main.v_Main',
    launch: function () {
//        console.log('launch');
    }
});