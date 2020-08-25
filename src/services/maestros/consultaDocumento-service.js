import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/Maestro"
const MaestroService = {}

MaestroService.ConsultarDNIRUC = function(Usuario, idCliente, documento, tipoDocumento){
    return sistemaService.get(apiLogin + '/DNIRUC', 
        { 
            params: { 
                "usuario" : Usuario,
                "idCliente" : idCliente,
                "nroDoc" : documento,
                "tipoDoc" : tipoDocumento
            } 
        }
        )
        .then(res => res.data)
}

export default MaestroService