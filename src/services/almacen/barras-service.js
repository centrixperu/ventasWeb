import sistemaService from '../sistema-servicio'
import configService from '../config'

const apiLogin = "/CodigoBarras"
const CodigoBarrasService = {}

CodigoBarrasService.CargarDatosIniciales = function(Usuario,idCliente){
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

CodigoBarrasService.downloadBarras= function(lobe) {
    this.urlBackEnd =  configService.apiUrl + "api/ReporteCodigoBarra/ReporteDocumento?lst=" + lobe;
    //this.urlBackEnd =  configService.apiUrl + 'api/ReporteCodigoBarra/ReporteDocumento?lstReporteCodigoBarras=' + lobe
    //this.urlBackEnd = this.sistemaService + "/ReporteCodigoBarra/ReporteDocumento?lstReporteCodigoBarras=" + lobe;
    //this.urlBackEnd = sistemaService.post("/ReporteCodigoBarra/ReporteDocumento", lobe);
    console.log(this.urlBackEnd);
    window.open(this.urlBackEnd ,"_blank");
}

export default CodigoBarrasService