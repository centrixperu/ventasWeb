import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/ConfGrupos"
const confGrupoService = {}

confGrupoService.CargarDatosIniciales = function(Usuario){
    return sistemaService.get(apiLogin + '/Listar', 
        { 
            params: { 
                "usuario" : Usuario
            } 
        }
        )
        .then(res => res.data)
}

confGrupoService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

confGrupoService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}

confGrupoService.Eliminar = function(obe){
    return sistemaService.get(apiLogin + '/Eliminar', 
    { 
        params: { 
            "id"  : obe.id,
            "usuario" : obe.usercre
        } 
    }
    )
    .then(res => res.data)
}

export default confGrupoService