import { FileHelper } from "../../../../utils/file.helper";
import { injectable } from "inversify";
import { IwebConfigEntity } from "../../../../Database/models/webClient";
import { logger } from "../../../../config/log.winston";
import { IUnInstallWebClient } from "../../interfaces/iunInstallWebClient";
import { RemoveTextFile, REMOVE_TYPE } from "../../../../utils/config/editFile";
import * as constant  from "../config/nginx.const";

@injectable()
export class NginxUnInstallWebClient implements IUnInstallWebClient {
    

    run(webClient:IwebConfigEntity):IwebConfigEntity | boolean {
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
    


    deleteTrackerfromConf(pathFile:string,tagtracker=""): string | boolean{
        const dataRemove:RemoveTextFile= {textTosearch:tagtracker,removeType:REMOVE_TYPE.AND_X_LINE_AFTER,linesDelete:1}
        return  FileHelper.removeTextFile(pathFile,dataRemove);
    } 

    deleteFile(pathFile="") : boolean {
        return  FileHelper.deleteFileSync(pathFile);
    }

}