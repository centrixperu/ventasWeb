import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/Traspaso"
const TraspasoService = {}

TraspasoService.CargarDatosIniciales = function(Usuario,idCliente){
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

TraspasoService.CargarProductos = function(Usuario,idCliente,idTienda){
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

TraspasoService.TraspasarTienda = function(obe){
    return sistemaService.post(apiLogin + '/Traspasar', obe)
                .then(res => res.data)
}

export default TraspasoService