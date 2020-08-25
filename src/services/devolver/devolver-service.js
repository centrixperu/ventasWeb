import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/Devolver"
const DevolverService = {}

DevolverService.CargarDatosIniciales = function(Usuario,idCliente){
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

DevolverService.CargarProductos = function(Usuario,idCliente,idTienda){
    return sistemaService.get(apiLogin + '/ProductosTienda', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente":idCliente,
                "idTienda": idTienda
            } 
        }
        )
        .then(res => res.data)
}

DevolverService.DevolverAlmacen = function(obe){
    return sistemaService.post(apiLogin + '/Devolver', obe)
                .then(res => res.data)
}

export default DevolverService