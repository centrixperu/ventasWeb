import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AdministrarArchivo"
const ArchivoAdjuntoService = {}

ArchivoAdjuntoService.GuardarFile = function(obe){
    return sistemaService.post(apiLogin + '/GuardarArchivoVue',obe)
                .then(res => res.data)
}

export default ArchivoAdjuntoService