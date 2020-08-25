import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/DashBoard"
const DashBoardService = {}

DashBoardService.CargarDatosIniciales = function(Usuario, idCliente){
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

export default DashBoardService