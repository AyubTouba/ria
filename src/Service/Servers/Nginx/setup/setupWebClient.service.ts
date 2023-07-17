import { injectable } from "inversify";
import { EXTENSION_LOG, SERVER_END_VH } from "../../../../config/constant";
import { logger } from "../../../../config/log.winston";
import { IserverConfigEntity } from "../../../../Database/models/serverConfig";
import { IwebConfigEntity } from "../../../../Database/models/webClient";
import { EditFile, WRITE_POSITION } from "../../../../utils/config/editFile";
import { FileHelper } from "../../../../utils/file.helper";
import { ToolsHelper } from "../../../../utils/tools.helper";
import { IWebClientSetup } from "../../interfaces/iwebClientSetup";
import * as constant  from "../config/nginx.const";
import { NginxHelper } from "../config/nginxHelper";

@injectable()
export class NginxSetupWebClient implements IWebClientSetup {
    
  

    run(webClient:IwebConfigEntity):IwebConfigEntity | boolean {
       try {
        webClient.is_configured = false; 
        const server:IserverConfigEntity   = webClient.server as IserverConfigEntity  ;
        webClient.conf_tracker_file  = this.setupFileConfigWebClient(server.folder_config_tracker,webClient.server_name,webClient.path_log_folder);
        if(!webClient.conf_tracker_file || webClient.conf_tracker_file == "false") {
            webClient.conf_tracker_file = "";
            return webClient;
        }
            
       const  isSetup = this.setupVirtualHost(webClient.virtual_host_file,webClient.server_name+"",NginxHelper.addIncludeToLine(webClient.conf_tracker_file,constant.STARTED_TAG+webClient.server_name));
       if(!isSetup || isSetup == "false") return webClient;
 
       if(!FileHelper.isFileExist(webClient.path_log_folder)) return webClient;
       
       webClient.logFile = ToolsHelper.concactFolderWFile(webClient.path_log_folder,webClient.server_name+EXTENSION_LOG);
       
        webClient.is_configured = true ;
        return webClient;
       } catch (error) {
        logger.log({
            level: 'error',
            message: 'Error raise in webClient setup mode!!' ,
            additional: error,
          });
        return false;  
       }
    }
    
    setupFileConfigWebClient(pathTrackerFolder="",ServerName:string,pathLogFolder:string):string{
        const result =    FileHelper.createAndWriteInFile(ToolsHelper.concactFolderWFile(pathTrackerFolder,ServerName + constant.EXSENTION_CONF)
        ,NginxHelper.getTextLog(pathLogFolder,ServerName));

        return result ? result : '';
    } 
    
    setupVirtualHost(pathfile:string,serverName:string,text = ""):string{
        const args:EditFile={pathfile,serverName,text,searchON:SERVER_END_VH.NGINX,isTextExist:true,tagSearch:constant.STARTED_TAG+serverName,position:WRITE_POSITION.DOWN_LINE}
        const result =     FileHelper.editFileSync(args);

        return result ? result : '';
    } 


}