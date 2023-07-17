import { IserverConfigEntity } from "../../../Database/models/serverConfig";

/**
 * @category Service 
 * @subcategory  Apache
 * @subcategory  Interfaces
 */
export interface IServerSetup {
  
  /**
   * this function is for runnig the prosess of Setup a server
   * @param  {IserverConfigEntity} server
   * @returns {IserverConfigEntity}
   */
  run(server:IserverConfigEntity):any
  
}