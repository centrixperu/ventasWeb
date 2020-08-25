import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/ConfCategorias"
const confCategoriaService = {}

confCategoriaService.CargarDatosIniciales = function(Usuario){
    return sistemaService.get(apiLogin + '/Listar', 
        { 
            params: { 
                "usuario" : Usuario
            } 
        }
        )
        .then(res => res.data)
}

confCategoriaService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

confCategoriaService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}
/*
confCategoriaService.EliminarGrupo = function(obeGrupo){
    return sistemaService.get(apiLogin + '/Eliminar', 
    { 
        params: { 
            "id"  : obeGrupo.id,
            "usuario" : obeGrupo.usercre
        } 
    }
    )
    .then(res => res.data)
}
*/

export default confCategoriaService