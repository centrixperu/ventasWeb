import sistemaService from '../sistema-servicio'

const apiLogin = "/ReporteCliente"
const ReporteClienteService = {}

ReporteClienteService.ReporteGuia = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin){
    return sistemaService.get(apiLogin + '/VerGuia', 
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

ReporteClienteService.ReporteVentaProducto = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin){
    return sistemaService.get(apiLogin + '/VentaProducto', 
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

ReporteClienteService.ReporteVentaPrecio = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin){
    return sistemaService.get(apiLogin + '/VentaPrecio', 
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

ReporteClienteService.ReporteKardexProducto = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin){
    return sistemaService.get(apiLogin + '/KardexProducto', 
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

ReporteClienteService.ReporteKardexPrecio = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin){
    return sistemaService.get(apiLogin + '/KardexPrecio', 
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

export default ReporteClienteService