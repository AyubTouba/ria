import { injectable } from "inversify";
import { logger } from "../../../../config/log.winston";
import { IserverConfigEntity } from "../../../../Database/models/serverConfig";
import { EditFile, WRITE_POSITION } from "../../../../utils/config/editFile";
import { FileHelper } from "../../../../utils/file.helper";
import { ToolsHelper } from "../../../../utils/tools.helper";
import { IServerSetup } from "../../interfaces/iserverSetup";
import * as constant  from "../config/nginx.const";
import { NginxHelper } from "../config/nginxHelper";

@injectable()
export class NginxSetupServer implements IServerSetup {
    


    run(server:IserverConfigEntity):IserverConfigEntity | boolean {
       try {
        server.is_configured = false;
        server.folder_config_tracker =  this.createConfTrackerFolder(server.folder_config) ;
        if(!server.folder_config_tracker || server.folder_config_tracker == "" )  {
          server.folder_config_tracker ="";
          return server ;
        } 

        server.config_file_tracker   = this.setupConfigTracker(server.folder_config_tracker);
        if(!server.config_file_tracker || server.config_file_tracker == "")  {
          server.config_file_tracker ="";
          return server ;
        } 
        
        const isSetupConfig =  this.setupServerConfig(server.config_file,server.config_file_tracker,server.name);
        if(!isSetupConfig  || isSetupConfig == "" ) return server ;

        server.is_configured = true;
          return server;

       } catch (error) {
        logger.log({
            level: 'error',
            message: 'Error raise in server setup mode!!' ,
            additional: error,
          });
        return false;
       }
    }

    setupConfigTracker(pathConfig="") : string{
      const result =   FileHelper.createAndWriteInFile(ToolsHelper.concactFolderWFile(pathConfig,constant.CONFIG_FILENAME) 
        ,constant.WINDOWS_OS_CONFIG_CONF_FILE);
      
        return result ? result : '';

    } 
    
    setupServerConfig(pathfile:string,pathTracker="",serverName:string):string{
      const tagFile = constant.TRACKER_TAG +  ToolsHelper.removeSpace(serverName);
      const text =   NginxHelper.addIncludeToLine(pathTracker,constant.TRACKER_TAG +  ToolsHelper.removeSpace(serverName))
      const args:EditFile={pathfile,serverName:constant.FORMAT_TO_SEARCH,text,searchON:constant.FORMAT_TO_SEARCH,isTextExist:true,tagSearch:tagFile,position:WRITE_POSITION.DOWN_LINE}
      const result =    FileHelper.editFileSync(args);
      
      return result ? result : '';
    } 

    createConfTrackerFolder(pathConfig:string):string {
      const result =    FileHelper.createFolder(ToolsHelper.concactFolderWFile(pathConfig,constant.CONFIG_FOLDERNAME));
      
      return result ? result : '';
    }
}