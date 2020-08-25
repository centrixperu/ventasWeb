import sistemaService from '../sistema-servicio'
//import configService from '../config'

const apiLogin = "/Login"
const LoginService = {}

LoginService.LoginUser = function(usr, pwd){
    return sistemaService.post(apiLogin + '/Sesion', 
            {
                "usuarioLogin": usr,
                "passwordLogin": pwd
            }
        )
        .then(res => res.data)
}



export default LoginService