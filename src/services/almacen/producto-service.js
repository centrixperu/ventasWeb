import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AdministrarProducto"
const AdministrarProductoService = {}

AdministrarProductoService.CargarDatosIniciales = function(Usuario, idCliente){
    return sistemaService.get(apiLogin + '/DatosIniciales', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente": idCliente
            } 
        }
        )
        .then(res => res.data)
}
AdministrarProductoService.ListarFamilia = function(Usuario, cod){
    return sistemaService.get(apiLogin + '/Familia', 
        { 
            params: { 
                "usuario" : Usuario,
                "codigo": cod
            } 
        }
        )
        .then(res => res.data)
}
AdministrarProductoService.ListarClase = function(Usuario, IdSegmento, cod){
    return sistemaService.get(apiLogin + '/Clase', 
        { 
            params: { 
                "usuario" : Usuario,
                "idsegmento": IdSegmento,
                "codigo": cod
            } 
        }
        )
        .then(res => res.data)
}
AdministrarProductoService.ListarProducto = function(Usuario, IdSegmento, IdFamilia, cod){
    return sistemaService.get(apiLogin + '/Producto', 
        { 
            params: { 
                "usuario" : Usuario,
                "idsegmento": IdSegmento,
                "idfamilia": IdFamilia,
                "codigo": cod
            } 
        }
        )
        .then(res => res.data)
}
AdministrarProductoService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}
AdministrarProductoService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}
AdministrarProductoService.Eliminar = function(obe){
    return sistemaService.get(apiLogin + '/Eliminar', 
    { 
        params: { 
            "Id"  : obe.Id,
            "UsrModificador" : obe.UsrModificador,
            "IdCliente" : obe.IdCliente
        } 
    }
    )
    .then(res => res.data)
}
AdministrarProductoService.EliminarAdjunto = function(id, url, IdProducto, usuario, idCliente){
    return sistemaService.get(apiLogin + '/EliminarAdjunto', 
    { 
        params: { 
            "Id"  : id,
            "URL"  : url,
            "IdProducto" : IdProducto,
            "Usuario" : usuario,
            "IdCliente": idCliente
        } 
    }
    )
    .then(res => res.data)
}
AdministrarProductoService.CargarProductosModal = function(Usuario, idCliente, busqueda){
    return sistemaService.get(apiLogin + '/ListarProductos', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente": idCliente,
                "busqueda": busqueda,
            } 
        }
        )
        .then(res => res.data)
}

export default AdministrarProductoService