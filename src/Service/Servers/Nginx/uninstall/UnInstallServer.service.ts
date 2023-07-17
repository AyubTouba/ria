
import { injectable } from "inversify";
import { logger } from "../../../../config/log.winston";
import { IserverConfigEntity } from "../../../../Database/models/serverConfig";
import { RemoveTextFile, REMOVE_TYPE } from "../../../../utils/config/editFile";
import { FileHelper } from "../../../../utils/file.helper";
import { ToolsHelper } from "../../../../utils/tools.helper";
import { IUniInstallSetup } from "../../interfaces/iuniInstallSetup";
import * as constant  from "../config/nginx.const";



@injectable()
export class NginxUnInstallServer implements IUniInstallSetup {
    
  

    run(server:IserverConfigEntity):IserverConfigEntity | boolean {
       try {
        this.deleteTrackerfromConf(server.config_file,constant.TRACKER_TAG+ToolsHelper.removeSpace(server.name)) 
        this.deleteFolder(server.folder_config_tracker);
        server.is_configured = false;
         
         return server;

       } catch (error) {
        logger.log({
            level: 'error',
            message: 'Error raise in server uninstallsetup mode!!' ,
            additional: error,
          });
        return false;
       }
    }
  
    deleteTrackerfromConf(pathFile:string,tagtracker=""):string | boolean{
        const dataRemove:RemoveTextFile= {textTosearch:tagtracker,removeType:REMOVE_TYPE.AND_X_LINE_AFTER,linesDelete:1}
        return  FileHelper.removeTextFile(pathFile,dataRemove);
    } 

    deleteFolder(pathConfig="") : boolean {
        return  FileHelper.deleteFolderSync(pathConfig);
    }
}