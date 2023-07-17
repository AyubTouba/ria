import { FileHelper } from "../../../../utils/file.helper";
import { injectable } from "inversify";
import * as constant  from "../config/apache.const";
import { IwebConfigEntity } from "../../../../Database/models/webClient";
import { logger } from "../../../../config/log.winston";
import { IUnInstallWebClient } from "../../interfaces/iunInstallWebClient";
import { RemoveTextFile, REMOVE_TYPE } from "../../../../utils/config/editFile";

/**
 * @classdesc ApacheUnInstallWebClient is a service respansible of Uninstall a webClient related to apache server
 * @category Service 
 * @subcategory  Apache 
 */
@injectable()
export class ApacheUnInstallWebClient implements IUnInstallWebClient {
    
  

    run(webClient:IwebConfigEntity):IwebConfigEntity | boolean  {
       try {
         this.deleteTrackerfromConf(webClient.virtual_host_file,constant.STARTED_TAG+webClient.server_name);
         this.deleteFile(webClient.conf_tracker_file);
        webClient.conf_tracker_file = "";
        webClient.virtual_host_file = "";
        webClient.is_configured = false ;
        return webClient;
       } catch (error) {
        logger.log({
            level: 'error',
            message: 'Error raise in webClient UnInstall mode!!' ,
            additional: error,
          });
        return false;  
       }
    }
    

    /**
     * this function is for deleting the importing config web client file in virtual host conf
     * @param  {string} pathFile path of virtual host  file
     * @param  {string} tagwebClient  tag of the web client
     */
    deleteTrackerfromConf(pathFile:string,tagwebClient=""): boolean | string{
        const dataRemove:RemoveTextFile= {textTosearch:tagwebClient,removeType:REMOVE_TYPE.AND_X_LINE_BEFORE,linesDelete:1}
        const result =   FileHelper.removeTextFile(pathFile,dataRemove);
         return result ? result : '';
    } 
    
    /**
     * this function is for deleting config webclient file 
     * @param  {string} pathFile path config web client file 
     */
    deleteFile(pathFile=""): boolean{
        return  FileHelper.deleteFileSync(pathFile);
    }

}