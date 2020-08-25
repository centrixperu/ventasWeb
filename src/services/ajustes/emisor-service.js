import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/AjusteEmisor"
const AjusteEmisorService = {}

AjusteEmisorService.CargarDatosIniciales = function(Usuario, idCliente){
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

AjusteEmisorService.ListarProvincia = function(Usuario, cod){
    return sistemaService.get(apiLogin + '/Provincia', 
        { 
            params: { 
                "usuario" : Usuario,
                "codigo": cod
            } 
        }
        )
        .then(res => res.data)
}
AjusteEmisorService.ListarDistrito = function(Usuario, IdDepartamento, cod){
    return sistemaService.get(apiLogin + '/Distrito', 
        { 
            params: { 
                "usuario" : Usuario,
                "idDepartamento": IdDepartamento,
                "codigo": cod
            } 
        }
        )
        .then(res => res.data)
}

AjusteEmisorService.Guardar = function(obe){
    return sistemaService.post(apiLogin + '/Guardar', obe)
                .then(res => res.data)
}

AjusteEmisorService.Actualizar = function(obe){
    return sistemaService.post(apiLogin + '/Actualizar', obe)
                .then(res => res.data)
}

AjusteEmisorService.Eliminar = function(obe){
    return sistemaService.get(apiLogin + '/Eliminar', 
    { 
        params: { 
            "Id"  : obe.Id,
            "IdCliente": obe.IdCliente,
            "UsrModificador" : obe.UsrModificador
        } 
    }
    )
    .then(res => res.data)
}

export default AjusteEmisorService