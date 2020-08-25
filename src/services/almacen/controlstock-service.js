import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/ControlStock"
const ControlStockService = {}

ControlStockService.CargarProductosTienda = function(Usuario, idCliente, idAlmacen, idTienda){
    return sistemaService.get(apiLogin + '/Productos', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente":idCliente,
                "idAlmacen": idAlmacen,
                "idTienda": idTienda
            }
        }
        )
        .then(res => res.data)
}


ControlStockService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}


export default ControlStockService