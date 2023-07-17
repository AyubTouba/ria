import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { logger } from "../../config/log.winston";
import container from "../../config/inversify.config";
import { WebClientService } from "../../Database/services/webClientService";
import { IWebClientSetup } from "./interfaces/iwebClientSetup";
import { SetupWebClient } from "./Apache/setup/setupWebClient.service";
import { IserverConfigEntity } from "../../Database/models/serverConfig";
import * as constant from "../../config/constant";
import { UnInstallWebClients } from "./unInstallWebClient";
import { NginxSetupWebClient } from "./Nginx/setup/setupWebClient.service";

@injectable()
export class SetupWebClients {

  constructor(
    @inject(TYPES.WebClientService) private webClientService: WebClientService,
    @inject(TYPES.UnInstallWebClients) private unInstallWebClients: UnInstallWebClients,

  ) {}


  async setup(): Promise<void> {
    const webClients = await this.webClientToSetup();
  
        for(let webClient of webClients) 
        {   
          logger.log({
            level: 'info',
            message: 'The webclient "' + webClient.server_name +'" is on setup mode...' ,
          });
          
             const server:IserverConfigEntity   = webClient.server as IserverConfigEntity  ;
              if(!server || !server.is_configured ) {
                logger.log({
                  level: 'warn',
                  message: 'The server:  '+ server.name +' is not configured, it couldn\'t setup The webclient ' + webClient.server_name 
                });
                continue;
              }
            const setupWebClient:IWebClientSetup = this.getWebClientSetup(server.server_type );
            if(setupWebClient){
                webClient =  setupWebClient.run(webClient);
                if(!webClient.is_configured) {
                  this.unInstallWebClients.uninstallOne(webClient);
                  logger.log({
                    level: 'warn',
                    message: 'The webclient doesn\'t setup properly ...' ,
                  });
                }else {
                  const update =   await this.webClientService.update(webClient._id,webClient);
                  logger.log({
                   level: 'info',
                   message: webClient.server_name +' is succefully setup ...' ,
                   additional:update 
                 });
                }
               
            }
             //this.readFileAddToDatabase(website);
        }
      
  }

   
  private async webClientToSetup() {
    return  await this.webClientService.getAll({is_configured : false},{workSpace:0});
    }

  private getWebClientSetup(serverType:constant.SERVERS_TYPE):IWebClientSetup  {
        if(serverType == constant.SERVERS_TYPE.APACHE)
        return  container.get<SetupWebClient>(TYPES.SetupWebClient);
      else  if(serverType == constant.SERVERS_TYPE.NGINX)
        return  container.get<NginxSetupWebClient>(TYPES.NginxSetupWebClient);
        
    return  container.get<SetupWebClient>(TYPES.SetupWebClient);
  }  

}
