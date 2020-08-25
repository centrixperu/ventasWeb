import sistemaService from '../sistema-servicio'

const apiLogin = "/ReporteClienteTienda"
const ReporteClienteTiendaService = {}

ReporteClienteTiendaService.CargarDatosIniciales = function(Usuario, idCliente){
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

ReporteClienteTiendaService.CargarAlmacen = function(Usuario, idCliente){
    return sistemaService.get(apiLogin + '/Almacen', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente
            } 
        }
        )
        .then(res => res.data)
}

ReporteClienteTiendaService.ReporteGuia = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/GuiaTienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "isDia" : isDia,
                "isMes" : isMes,
                "isAnio" : isAnio,
                "isRango" : isRango,
                "fechaInicio" : fechainicio,
                "fechaFin" : fechafin,
                "idTienda": idTienda,
                "desTienda": desTienda
            } 
        }
        )
        .then(res => res.data)
}

ReporteClienteTiendaService.ReporteVentaProducto = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/VentaProductoTienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "isDia" : isDia,
                "isMes" : isMes,
                "isAnio" : isAnio,
                "isRango" : isRango,
                "fechaInicio" : fechainicio,
                "fechaFin" : fechafin,
                "idTienda": idTienda,
                "desTienda": desTienda
            } 
        }
        )
        .then(res => res.data)
}

ReporteClienteTiendaService.ReporteVentaPrecio = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/VentaPrecioTienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "isDia" : isDia,
                "isMes" : isMes,
                "isAnio" : isAnio,
                "isRango" : isRango,
                "fechaInicio" : fechainicio,
                "fechaFin" : fechafin,
                "idTienda": idTienda,
                "desTienda": desTienda
            } 
        }
        )
        .then(res => res.data)
}

ReporteClienteTiendaService.ReporteKardexProducto = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/KardexProductoTienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "isDia" : isDia,
                "isMes" : isMes,
                "isAnio" : isAnio,
                "isRango" : isRango,
                "fechaInicio" : fechainicio,
                "fechaFin" : fechafin,
                "idTienda": idTienda,
                "desTienda": desTienda
            } 
        }
        )
        .then(res => res.data)
}

ReporteClienteTiendaService.ReporteKardexPrecio = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/KardexPrecioTienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "isDia" : isDia,
                "isMes" : isMes,
                "isAnio" : isAnio,
                "isRango" : isRango,
                "fechaInicio" : fechainicio,
                "fechaFin" : fechafin,
                "idTienda": idTienda,
                "desTienda": desTienda
            } 
        }
        )
        .then(res => res.data)
}

ReporteClienteTiendaService.RegistroVentas = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/RegistroVentasTienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "isDia" : isDia,
                "isMes" : isMes,
                "isAnio" : isAnio,
                "isRango" : isRango,
                "fechaInicio" : fechainicio,
                "fechaFin" : fechafin,
                "idTienda": idTienda,
                "desTienda": desTienda
            } 
        }
        )
        .then(res => res.data)
}

ReporteClienteTiendaService.MovimientoAlmacen = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/MovimientoAlmacen', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "isDia" : isDia,
                "isMes" : isMes,
                "isAnio" : isAnio,
                "isRango" : isRango,
                "fechaInicio" : fechainicio,
                "fechaFin" : fechafin,
                "idAlmacen": idTienda,
                "desAlmacen": desTienda
            } 
        }
        )
        .then(res => res.data)
}

export default ReporteClienteTiendaService