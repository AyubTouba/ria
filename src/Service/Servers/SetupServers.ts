import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import * as constant from "../../config/constant";
import { logger } from "../../config/log.winston";
import { ServerConfigService } from "../../Database/services/serverConfigService";
import { IServerSetup } from "./interfaces/iserverSetup";
import container from "../../config/inversify.config";
import { ApacheSetupServer } from "./Apache/setup/setupServer.service";
import { UnInstallServer } from "./unInstallServers";
import { NginxSetupServer } from "./Nginx/setup/setupServer.service";


@injectable()
export class SetupServers {

  constructor(
    @inject(TYPES.ServerConfigService) private serverConfigService: ServerConfigService,
    @inject(TYPES.UnInstallServer) private unInstallServer: UnInstallServer,
  ) {}

  async setup() : Promise<void> {
    const servers = await this.ServersToSetup();
        for(let server of servers) 
        {   
          logger.log({
            level: 'info',
            message: 'The server "' + server.name +'" is on setup mode...' ,
          });
            const setupServer:IServerSetup = this.getServerSetup(server.server_type);
            if(setupServer){
                server =  setupServer.run(server);
                if(server.is_configured === true) {
                  await this.serverConfigService.update(server._id,server);
                  logger.log({
                   level: 'info',
                   message: server.name +' server is succefully setup ...' ,
                 });
                }else {
                  this.unInstallServer.uninstallOne(server);
                  logger.log({
                    level: 'warn',
                    message: 'The server doesn\'t setup properly ...' ,
                  });
                }
            }
        }
      
  }

   
  private async ServersToSetup() {
    return  await this.serverConfigService.getAll({is_configured : false},{workSpace:0});
    }

  private getServerSetup(serverType:constant.SERVERS_TYPE):IServerSetup  {
        if(serverType == constant.SERVERS_TYPE.APACHE)
        return  container.get<ApacheSetupServer>(TYPES.ServerSetupApache);
        else if(serverType == constant.SERVERS_TYPE.NGINX)
        return  container.get<NginxSetupServer>(TYPES.NginxSetupServer);
        
    return  container.get<ApacheSetupServer>(TYPES.ServerSetupApache);
  }  

}
