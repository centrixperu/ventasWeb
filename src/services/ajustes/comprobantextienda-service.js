import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AjusteComprobanteXTienda"
const AjusteComprobanteXTiendaService = {}

AjusteComprobanteXTiendaService.CargarDatosIniciales = function(Usuario, idCliente){
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

AjusteComprobanteXTiendaService.CargarDatosCambioCliente = function(Usuario, idCliente){
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

AjusteComprobanteXTiendaService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

AjusteComprobanteXTiendaService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}

AjusteComprobanteXTiendaService.Eliminar = function(obe){
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

export default AjusteComprobanteXTiendaService