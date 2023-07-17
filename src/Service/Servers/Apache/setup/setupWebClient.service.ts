import { FileHelper } from "../../../../utils/file.helper";
import {  injectable } from "inversify";
import * as constant  from "../config/apache.const";
import { IWebClientSetup } from "../../interfaces/iwebClientSetup";
import { IwebConfigEntity } from "../../../../Database/models/webClient";
import { logger } from "../../../../config/log.winston";
import { ApacheHelper } from "../config/apacheHelper";
import { ToolsHelper } from "../../../../utils/tools.helper";
import { EXTENSION_LOG, SERVER_END_VH } from "../../../../config/constant";
import { IserverConfigEntity } from "../../../../Database/models/serverConfig";
import { EditFile, WRITE_POSITION } from "../../../../utils/config/editFile";

/**
 * @classdesc SetupWebClient is a service respansible of setup a webClient related to apache server
 * @category Service 
 * @subcategory  Apache 
 */
@injectable()
export class SetupWebClient implements IWebClientSetup {

    run(webClient:IwebConfigEntity):IwebConfigEntity | boolean {
       try {
        webClient.is_configured = false; 
        const server:IserverConfigEntity   = webClient.server as IserverConfigEntity  ;
        webClient.conf_tracker_file  = this.setupFileConfigWebClient(server.folder_config_tracker,webClient.server_name,webClient.path_log_folder);
        if(!webClient.conf_tracker_file || webClient.conf_tracker_file == "") {
            webClient.conf_tracker_file = "";
            return webClient;
        }
            
       const  isSetup = this.setupVirtualHost(webClient.virtual_host_file,webClient.server_name+"",ApacheHelper.addIncludeToLine(webClient.conf_tracker_file,constant.STARTED_TAG+webClient.server_name));
       if(!isSetup || isSetup == "") return webClient;
 
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
    
    /**
     * @param  {} pathTrackerFolder path of tracker folder
     * @param  {string} ServerName server name
     * @param  {string} pathLogFolder path of the log folder 
     * @returns {string}
     */
    setupFileConfigWebClient(pathTrackerFolder="",ServerName:string,pathLogFolder:string):string {
       const result =  FileHelper.createAndWriteInFile(ToolsHelper.concactFolderWFile(pathTrackerFolder,ServerName + constant.EXSENTION_CONF)
        ,ApacheHelper.getTextLog(pathLogFolder,ServerName));

        return result ? result : '';
    } 
    
    /**
     * this function is to include config webclient file to VirtualHost config file
     * @param  {string} pathfile path of VirtualHost config
     * @param  {string} serverName servername
     * @param  {} text="" include statement
     * @returns {string}
     */
    setupVirtualHost(pathfile:string,serverName:string,text = ""):string   {
        const args:EditFile={pathfile,serverName,text,searchON:SERVER_END_VH.APACHE,isTextExist:true,tagSearch:constant.STARTED_TAG+serverName,position:WRITE_POSITION.UP_LINE}
        const result =  FileHelper.editFileSync(args) ;
        return result ? result : 'null';
    } 


}