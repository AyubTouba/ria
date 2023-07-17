import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import * as constant from "../../config/constant";
import { logger } from "../../config/log.winston";
import { ServerConfigService } from "../../Database/services/serverConfigService";
import container from "../../config/inversify.config";
import { IUniInstallSetup } from "./interfaces/iuniInstallSetup";
import { ApacheUnInstallServer } from "./apache/uninstall/unInstallServers";
import { IserverConfig } from "../../Database/models/serverConfig";
import { NginxUnInstallServer } from "./Nginx/uninstall/unInstallServer.service";
import { UnInstallWebClients } from "./unInstallWebClient";

@injectable()
export class UnInstallServer {

  constructor(
    @inject(TYPES.ServerConfigService) private serverConfigService: ServerConfigService,
    @inject(TYPES.UnInstallWebClients) private unInstallWebClients: UnInstallWebClients,
  ) {}

  async uninstall(): Promise<void> {
    const servers = await this.ServersToUnInstall();

        for(let server of servers) 
        {   
          logger.log({
            level: 'info',
            message: 'The server "' + server.name +'" is on Uninstall mode...' ,
          });
            const uninstallServer:IUniInstallSetup = this.getServerSetup(server.server_type);
            if(uninstallServer){
              await this.unInstallWebClients.uninstall({server:server._id});
                server =  uninstallServer.run(server);
                if(server) {
                  await this.serverConfigService.remove({_id:server._id});
                  logger.log({
                   level: 'info',
                   message: server.name +' server is succefully Uninstall ...' ,
                 });
                }
            }
        }
      
  }

  async uninstallOne(server:IserverConfig) : Promise<void>{
            const setupServer:IUniInstallSetup = this.getServerSetup(server.server_type);
            if(setupServer){
                server =  setupServer.run(server);
            }
  } 
  private async ServersToUnInstall() : Promise<IserverConfig[]>{
    return  await this.serverConfigService.getAll({is_deleted : true},{workSpace:0});
    }

  private getServerSetup(serverType:constant.SERVERS_TYPE):IUniInstallSetup  {
        if(serverType == constant.SERVERS_TYPE.APACHE)
        return  container.get<ApacheUnInstallServer>(TYPES.ApacheUnInstallServer);
       else if(serverType == constant.SERVERS_TYPE.NGINX)
        return  container.get<NginxUnInstallServer>(TYPES.NginxUnInstallServer);
        
    return  container.get<ApacheUnInstallServer>(TYPES.ApacheUnInstallServer);
  }  

}
