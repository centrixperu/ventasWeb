import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AsignarAlmacen"
const AsignarAlmacenService = {}

AsignarAlmacenService.CargarDatosIniciales = function(Usuario,idCliente){
    return sistemaService.get(apiLogin + '/DatosIniciales', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente":idCliente
            } 
        }
        )
        .then(res => res.data)
}

AsignarAlmacenService.CargarTienda = function(Usuario,idCliente,idAlmacen){
    return sistemaService.get(apiLogin + '/Tienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente":idCliente,
                "idAlmacen":idAlmacen
            } 
        }
        )
        .then(res => res.data)
}

AsignarAlmacenService.CargarProductosTienda = function(Usuario,idCliente,idAlmacen,idTienda){
    return sistemaService.get(apiLogin + '/ProductosTienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente":idCliente,
                "idAlmacen":idAlmacen,
                "idTienda":idTienda
            } 
        }
        )
        .then(res => res.data)
}

AsignarAlmacenService.CargarProductosAlmacen = function(Usuario,idCliente,idAlmacen){
    return sistemaService.get(apiLogin + '/ProductosAlmacen', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente":idCliente,
                "idAlmacen":idAlmacen
            } 
        }
        )
        .then(res => res.data)
}

AsignarAlmacenService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

AsignarAlmacenService.GuardarAsignarTienda = function(obe){
    return sistemaService.post(apiLogin + '/GuardarTienda', obe)
                .then(res => res.data)
}

AsignarAlmacenService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}

AsignarAlmacenService.Eliminar = function(obe){
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


export default AsignarAlmacenService