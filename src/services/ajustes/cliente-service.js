import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AjusteCliente"
const AjusteClienteService = {}

AjusteClienteService.CargarDatosIniciales = function(Usuario, idCliente){
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

AjusteClienteService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

AjusteClienteService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}

AjusteClienteService.Eliminar = function(obe){
    return sistemaService.get(apiLogin + '/Eliminar', 
    { 
        params: { 
            "Id"  : obe.Id,
            "UsrModificador" : obe.UsrModificador
        } 
    }
    )
    .then(res => res.data)
}

AjusteClienteService.EliminarLogo = function(url, IdCliente, usuario){
    return sistemaService.get(apiLogin + '/EliminarLogo', 
    {
        params: {
            "URL"  : url,
            "Id"  : IdCliente,
            "UsrModificador" : usuario
        } 
    }
    )
    .then(res => res.data)
}

export default AjusteClienteService