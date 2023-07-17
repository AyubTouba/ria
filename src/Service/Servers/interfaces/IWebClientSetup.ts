import { IwebConfigEntity } from "../../../Database/models/webClient";

/**
 * @category Service 
 * @subcategory  Apache
 * @subcategory  Interfaces
 */
export interface IWebClientSetup {

    /**
   *  this function is for runnig the prosess of setup a web client
   * @param  {IwebConfigEntity} webClient
   * @returns {IwebConfigEntity}
   */
    run(webClient:IwebConfigEntity): any;
  }