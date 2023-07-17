import { IwebConfigEntity } from "../../../Database/models/webClient";

/**
 * @category Service 
 * @subcategory  Apache
 * @subcategory  Interfaces
 */
export interface IUnInstallWebClient {
  /**
   *  this function is for runnig the prosess of UnInstall a web client
   * @param  {IwebConfigEntity} webClient
   * @returns {IwebConfigEntity}
   */
  run(webClient:IwebConfigEntity):any
  
}