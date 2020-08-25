import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AjusteAlmacen"
const AjusteAlmacenService = {}

AjusteAlmacenService.CargarDatosIniciales = function(Usuario, idCliente){
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

AjusteAlmacenService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

AjusteAlmacenService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}

AjusteAlmacenService.Eliminar = function(obe){
    return sistemaService.get(apiLogin + '/Eliminar', 
    { 
        params: { 
            "Id"  : obe.Id,
            "IdCliente" : obe.IdCliente,
            "UsrModificador" : obe.UsrModificador
        } 
    }
    )
    .then(res => res.data)
}

export default AjusteAlmacenService