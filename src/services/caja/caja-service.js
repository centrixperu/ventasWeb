import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/Caja"
const CajaService = {}

CajaService.CargarReporteCaja = function(Usuario,idCliente,isDia,isMes,isAnio,isRango,fechainicio,fechafin){
    return sistemaService.get(apiLogin + '/ReporteCaja', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente": idCliente,
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

CajaService.CargarDatosIniciales = function(obe){
    return sistemaService.post(apiLogin + '/DatosIniciales', obe)
        .then(res => res.data)
}

CajaService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/GuardarCaja', obe)
        .then(res => res.data)
}

CajaService.CargarProductosCaja = function(Usuario,idCliente,idTienda, busqueda){
    return sistemaService.get(apiLogin + '/ProductosCaja', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente": idCliente,
                "idTienda" : idTienda,
                "busqueda" : busqueda
            } 
        }
        )
        .then(res => res.data)
}

export default CajaService