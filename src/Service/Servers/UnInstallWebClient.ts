import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { logger } from "../../config/log.winston";
import container from "../../config/inversify.config";
import { WebClientService } from "../../Database/services/webClientService";
import { IserverConfigEntity } from "../../Database/models/serverConfig";
import * as constant from "../../config/constant";
import { IUnInstallWebClient } from "./interfaces/iunInstallWebClient";
import { ApacheUnInstallWebClient } from "./apache/uninstall/unInstallWebClient";
import { IwebConfig } from "../../Database/models/webClient";
import { NginxUnInstallWebClient } from "./Nginx/uninstall/unInstallWebClient.service";

@injectable()
export class UnInstallWebClients {

  constructor(
    @inject(TYPES.WebClientService) private webClientService: WebClientService,
    
  ) {}


  async uninstall(query?:any):Promise<void> {
    const webClients = await this.webClientToUnInstall(query);
    logger.log({
        level: 'info',
        message: 'The webclient to uninstall' ,
        additional:webClients
      });
        for(let webClient of webClients) 
        {   
          logger.log({
            level: 'info',
            message: 'The webclient "' + webClient.server_name +'" is on UnInstall mode...' ,
          });
          
             const server:IserverConfigEntity   = webClient.server as IserverConfigEntity  ;
        
            const unInstallWebClient:IUnInstallWebClient = this.getWebClientUnInstall(server.server_type);
            if(unInstallWebClient){
                webClient =  unInstallWebClient.run(webClient);
                await this.webClientService.remove({_id : webClient._id});
               
               logger.log({
                level: 'info',
                message: webClient.server_name +' is succefully UnInstall ...' ,
              });
            }
             //this.readFileAddToDatabase(website);
        }
      
  }

  async uninstallOne(webClient:IwebConfig): Promise<void> {
    const server:IserverConfigEntity   = webClient.server as IserverConfigEntity  ;
        
    const unInstallWebClient:IUnInstallWebClient = this.getWebClientUnInstall(server.server_type);
    if(unInstallWebClient){
        webClient =  unInstallWebClient.run(webClient);
    }
  }
  
  private async webClientToUnInstall(query?:any): Promise<IwebConfig[]> {
     query = query ? query : {is_deleted : true};
    return  await this.webClientService.getAll(query,{workSpace:0});
    }

  private getWebClientUnInstall(serverType:constant.SERVERS_TYPE):IUnInstallWebClient  {
        if(serverType == constant.SERVERS_TYPE.APACHE)
        return  container.get<ApacheUnInstallWebClient>(TYPES.IUnInstallWebClient);
       else if(serverType == constant.SERVERS_TYPE.NGINX)
        return  container.get<NginxUnInstallWebClient>(TYPES.NginxUnInstallWebClient);

        
    return  container.get<ApacheUnInstallWebClient>(TYPES.IUnInstallWebClient);
  }  

}
