function getHostName(){
    var urlHost='';
    var host = window.location.origin;
    var hostName = window.location.hostname;
    if(hostName=="127.0.0.1" || hostName=="localhost"){
        urlHost = "http://localhost:63385/";
    }else{
        //urlHost = host + "/SoftWebAPI/";
        urlHost = "http://vueapi.centrixperu.com/"
    }
    return urlHost;
}

const configService = {
    apiUrl: getHostName(),
}

export default configService