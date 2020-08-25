import sistemaService from '../sistema-servicio'

const apiLogin = "/ReporteFacturacion"
const ReporteFacturacionService = {}

ReporteFacturacionService.CargarComprobanteTienda = function(Usuario,idCliente,idTienda){
    return sistemaService.get(apiLogin + '/ComprobanteTienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "idTienda": idTienda
            } 
        }
        )
        .then(res => res.data)
}

ReporteFacturacionService.ReporteComprobante = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda,idComprobante){
    return sistemaService.get(apiLogin + '/ReporteComprobante', 
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
                "desTienda": desTienda,
                "idComprobante":idComprobante
            } 
        }
        )
        .then(res => res.data)
}

ReporteFacturacionService.ReporteResumenDiario = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/ResumenDiario', 
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

ReporteFacturacionService.ReporteBoleta = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/Boleta', 
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

ReporteFacturacionService.ReporteFactura = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/Factura', 
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

ReporteFacturacionService.ReporteNotaCredito = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/NotaCredito', 
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

ReporteFacturacionService.ReporteNotaDebito = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/NotaDebito', 
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

ReporteFacturacionService.ReporteComunicacionBaja = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin,idTienda,desTienda){
    return sistemaService.get(apiLogin + '/ComunicacionBaja', 
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

export default ReporteFacturacionService