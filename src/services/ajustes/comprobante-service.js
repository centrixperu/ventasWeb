import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AjusteComprobante"
const AjusteComprobanteService = {}

AjusteComprobanteService.CargarDatosIniciales = function(Usuario){//, idCliente){
    return sistemaService.get(apiLogin + '/DatosIniciales', 
        { 
            params: { 
                "usuario" : Usuario,
                //"idCliente" : idCliente
            } 
        }
        )
        .then(res => res.data)
}

AjusteComprobanteService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

AjusteComprobanteService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}

AjusteComprobanteService.Eliminar = function(obe){
    return sistemaService.get(apiLogin + '/Eliminar', 
    { 
        params: { 
            "Id"  : obe.Id,
            //"IdCliente" : obe.IdCliente,
            "UsrModificador" : obe.UsrModificador
        } 
    }
    )
    .then(res => res.data)
}

export default AjusteComprobanteService