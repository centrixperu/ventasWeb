import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AjusteAlmacenXTienda"
const AjusteAlmacenXTiendaService = {}

AjusteAlmacenXTiendaService.CargarDatosIniciales = function(Usuario, idCliente){
    return sistemaService.get(apiLogin + '/DatosIniciales', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente
            } 
        }
        )
        .then(res => res.data)
}

AjusteAlmacenXTiendaService.CargarDatosCambioCliente = function(Usuario, idCliente){
    return sistemaService.get(apiLogin + '/DatosCambioCliente', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente
            } 
        }
        )
        .then(res => res.data)
}

AjusteAlmacenXTiendaService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

AjusteAlmacenXTiendaService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}

AjusteAlmacenXTiendaService.Eliminar = function(obe){
    return sistemaService.get(apiLogin + '/Eliminar', 
    { 
        params: { 
            "Id"  : obe.Id,
            "IdCliente": obe.IdCliente,
            "UsrModificador" : obe.UsrModificador
        } 
    }
    )
    .then(res => res.data)
}

export default AjusteAlmacenXTiendaService