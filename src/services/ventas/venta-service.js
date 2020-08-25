import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/Venta"
const VentaService = {}

VentaService.CargarDatosIniciales = function(Usuario, idCliente){
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

VentaService.CargarComprobantes = function(Usuario, idCliente, idTienda){
    return sistemaService.get(apiLogin + '/Comprobantes', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "idTienda" : idTienda
            } 
        }
        )
        .then(res => res.data)
}

VentaService.CargarProductos = function(obe){
    return sistemaService.post(apiLogin + '/Productos', obe)
                .then(res => res.data)
}

VentaService.CargarImagenesProductosModal = function(Usuario, idCliente, idProducto){
    return sistemaService.get(apiLogin + '/ListarImagenProducto', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "idProducto" : idProducto
            } 
        }
        )
        .then(res => res.data)
}

VentaService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

VentaService.RegistroVentas = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin){
    return sistemaService.get(apiLogin + '/RegistroVentas', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "isDia" : isDia,
                "isMes" : isMes,
                "isAnio" : isAnio,
                "isRango" : isRango,
                "fechaInicio" : fechainicio,
                "fechaFin" : fechafin
            } 
        }
        )
        .then(res => res.data)
}

VentaService.VerDetalleVenta = function(Usuario,idCliente,id){
    return sistemaService.get(apiLogin + '/VerDetalleVenta', 
        {
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "idVenta" : id
            } 
        }
        )
        .then(res => res.data)
}

VentaService.AnularVenta = function(Usuario,idCliente,id){
    return sistemaService.get(apiLogin + '/Anular', 
        {
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "idVenta" : id
            } 
        }
        )
        .then(res => res.data)
}

VentaService.AnularVentaNC = function(Usuario,idCliente,id){
    return sistemaService.get(apiLogin + '/AnularNC', 
        {
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "idVenta" : id
            } 
        }
        )
        .then(res => res.data)
}

VentaService.ListadoVentas = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin){
    return sistemaService.get(apiLogin + '/ListadoVentas', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "isDia" : isDia,
                "isMes" : isMes,
                "isAnio" : isAnio,
                "isRango" : isRango,
                "fechaInicio" : fechainicio,
                "fechaFin" : fechafin
            } 
        }
        )
        .then(res => res.data)
}

VentaService.ListadoVentasACuenta = function(Usuario,idCliente,codCliente){
    return sistemaService.get(apiLogin + '/ListadoVentasACuenta', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "desCliente" : codCliente
            } 
        }
        )
        .then(res => res.data)
}

VentaService.VentaACuenta = function(obe){
    return sistemaService.post(apiLogin + '/VentaACuenta', obe)
                .then(res => res.data)
}

export default VentaService