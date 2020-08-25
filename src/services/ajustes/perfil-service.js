import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AjustePerfil"
const AjustePerfilService = {}

AjustePerfilService.CargarDatosIniciales = function(Usuario, idCliente){
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

AjustePerfilService.CargarDatosCliente = function(Usuario, idCliente){
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

AjustePerfilService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

AjustePerfilService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}

AjustePerfilService.Eliminar = function(obe){
    return sistemaService.get(apiLogin + '/Eliminar', 
    { 
        params: { 
            "Id"  : obe.Id,
            "IdCliente"  : obe.IdCliente,
            "UsrModificador" : obe.UsrModificador
        } 
    }
    )
    .then(res => res.data)
}

export default AjustePerfilService