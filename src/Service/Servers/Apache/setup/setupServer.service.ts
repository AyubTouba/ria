import {  IServerSetup } from "../../interfaces/iserverSetup";
import {  injectable } from "inversify";
import * as constant  from "../config/apache.const";
import { IserverConfigEntity } from "../../../../Database/models/serverConfig";
import { FileHelper } from "../../../../utils/file.helper";
import { ToolsHelper } from "../../../../utils/tools.helper";
import { ApacheHelper } from "../config/apacheHelper";
import { logger } from "../../../../config/log.winston";

/**
 * @classdesc ApacheSetupServer is a service respansible of setup a server of type apache
 * @category Service 
 * @subcategory  Apache 
 */
@injectable()
export class ApacheSetupServer implements IServerSetup {
    

    /**
     * this function is to run all the function of configuration
     * @param  {IserverConfigEntity} server all server information
     * @returns {IserverConfigEntity} with different state of configured 
     */
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
    /**
     * this function setup the tracker config for apache ( is for logging format )
     * @param  {string} pathConfig path config 
     */
    setupConfigTracker(pathConfig="") : string {
       const result =   FileHelper.createAndWriteInFile(ToolsHelper.concactFolderWFile(pathConfig,constant.CONFIG_FILENAME) 
        ,constant.WINDOWS_OS_CONFIG_CONF_FILE);
        return result ? result : '';
    } 
    
    /**
     * this function is to include the tracker file on the apache conf file
     * @param  {string} configServerFile apache conf file
     * @param  {string} pathTracker path of tracker config on the server
     * @param  {string} serverName server name 
     */
    setupServerConfig(configServerFile:string,pathTracker="",serverName:string) : string {
      const result =   FileHelper.writeInFileSync(configServerFile,ApacheHelper.addIncludeToLine(pathTracker,constant.TRACKER_TAG +  ToolsHelper.removeSpace(serverName)));
        return result ? result : '';

     } 
    /**
     * this function is for creating a folder for config tracker
     * @param  {string} pathConfig path of config tracker folder
     */
    createConfTrackerFolder(pathConfig:string) : string {
      const result =   FileHelper.createFolder(ToolsHelper.concactFolderWFile(pathConfig,constant.CONFIG_FOLDERNAME));
      return result ? result : '';
    }
}