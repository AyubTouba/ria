
import { injectable } from "inversify";
import { logger } from "../../../../config/log.winston";
import { IserverConfigEntity } from "../../../../Database/models/serverConfig";
import { RemoveTextFile, REMOVE_TYPE } from "../../../../utils/config/editFile";
import { FileHelper } from "../../../../utils/file.helper";
import { ToolsHelper } from "../../../../utils/tools.helper";
import { IUniInstallSetup } from "../../interfaces/iuniInstallSetup";
import * as constant  from "../config/apache.const";


/**
 * @classdesc ApacheUnInstallServer is a service respansible of UnInstall a server of type apache
 * @category Service 
 * @subcategory  Apache 
 */
@injectable()
export class ApacheUnInstallServer implements IUniInstallSetup {
    
   
    /**
     * @param  {IserverConfigEntity} server server informations
     * @returns  {IserverConfigEntity}
     */
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
  
    /**
     * this function is for deleting the importing config tracker file in apache conf
     * @param  {string} pathFile path apache conf file
     * @param  {string} tagtracker tag of the server
     */
    deleteTrackerfromConf(pathFile:string,tagtracker=""):string{
        const dataRemove:RemoveTextFile= {textTosearch:tagtracker,removeType:REMOVE_TYPE.AND_X_LINE_AFTER,linesDelete:1}
        const result =  FileHelper.removeTextFile(pathFile,dataRemove);
        return result ? result : '';
    } 
    /**
     * this function is for deleting folder tracker
     * @param  {string} pathFolderTracker path folder tracker
     */
    deleteFolder(pathFolderTracker=""):boolean {
        return FileHelper.deleteFolderSync(pathFolderTracker);
    }
}