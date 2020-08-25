import trae from 'trae'
import configService from './config'

const sistemaService = trae.create({
  baseUrl: configService.apiUrl + "api"
})

export default sistemaService
