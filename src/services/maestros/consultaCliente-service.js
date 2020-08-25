import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/Maestro"
const MaestroService = {}

MaestroService.ConsultarCliente = function(Usuario, idCliente, nombreCliente){
    return sistemaService.get(apiLogin + '/ClienteVenta', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "desCliente" : nombreCliente
            } 
        }
        )
        .then(res => res.data)
}

export default MaestroService