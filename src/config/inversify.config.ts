import { Container } from "inversify";
import { DatabaseService } from "../Database/services/databaseService";
import TYPES from "./types";
import { Application } from "../application";
import { ServerConfigService } from "../Database/services/serverConfigService";
import { WorkSpaceService } from "../Database/services/workspaceService";
import { WebClientService } from "../Database/services/webClientService";
import { LogRequestService } from "../Database/services/logRequestService";
import {LogsWorker } from "../worker/logs.worker";
import { LogTracker } from "../Service/logger/logTracker";
import { IServerSetup } from "../service/servers/interfaces/iserverSetup";
import { ApacheSetupServer } from "../Service/Servers/Apache/setup/setupServer.service";
import { SetupServers } from "../Service/Servers/setupServers";
import { SetupServerWorker } from "../worker/setupServer.worker";
import { SetupWebClient } from "../Service/Servers/Apache/setup/setupWebClient.service";
import { IWebClientSetup } from "../Service/Servers/interfaces/iwebClientSetup";
import { SetupWebClientWorker } from "../worker/setupWebClient.worker";
import { SetupWebClients } from "../Service/Servers/setupWebClient";
import { ApacheUnInstallServer } from "../service/servers/apache/uninstall/unInstallServers";
import { IUniInstallSetup } from "../service/servers/interfaces/iuniInstallSetup";
import { UnInstallServerWorker } from "../worker/unInstallServer.worker";
import { IUnInstallWebClient } from "../service/servers/interfaces/iunInstallWebClient";
import { UnInstallWebClients } from "../Service/Servers/unInstallWebClient";
import { UnInstallWebClientWorker } from "../worker/unInstallWebClient.worker";
import { NginxSetupServer } from "../Service/Servers/Nginx/setup/setupServer.service";
import { ApacheUnInstallWebClient } from "../service/servers/apache/uninstall/unInstallWebClient";
import { UnInstallServer } from "../Service/Servers/unInstallServers";
import { NginxSetupWebClient } from "../Service/Servers/Nginx/setup/setupWebClient.service";
import { NginxUnInstallWebClient } from "../Service/Servers/Nginx/uninstall/unInstallWebClient.service";
import { NginxUnInstallServer } from "../Service/Servers/Nginx/uninstall/unInstallServer.service";
import { SocketIo } from "../service/socket/socket";
import { WebClientCommand } from "../commander/commands/webclient.command";
import { Commander } from "../commander/commander";
import { ServerCommand } from "../commander/commands/server.command";
import { WorkSpaceCommand } from "../commander/commands/workspace.command";

const container = new Container();
container.bind<Application>(TYPES.Application).to(Application).inSingletonScope();

// Database Service 
container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
container.bind<ServerConfigService>(TYPES.ServerConfigService).to(ServerConfigService).inSingletonScope();
container.bind<WorkSpaceService>(TYPES.WorkSpaceService).to(WorkSpaceService).inSingletonScope();
container.bind<WebClientService>(TYPES.WebClientService).to(WebClientService).inSingletonScope();
container.bind<LogRequestService>(TYPES.LogRequestService).to(LogRequestService).inSingletonScope();

// Business Service
container.bind<LogTracker>(TYPES.LogTracker).to(LogTracker).inSingletonScope();
container.bind<IServerSetup>(TYPES.ServerSetupApache).to(ApacheSetupServer).inSingletonScope();
container.bind<SetupServers>(TYPES.Servers).to(SetupServers).inSingletonScope();
container.bind<UnInstallServer>(TYPES.UnInstallServer).to(UnInstallServer).inSingletonScope();
container.bind<IWebClientSetup>(TYPES.SetupWebClient).to(SetupWebClient).inSingletonScope();
container.bind<SetupWebClients>(TYPES.WebClients).to(SetupWebClients).inSingletonScope();
container.bind<IUniInstallSetup>(TYPES.ApacheUnInstallServer).to(ApacheUnInstallServer).inSingletonScope();
container.bind<IUnInstallWebClient>(TYPES.IUnInstallWebClient).to(ApacheUnInstallWebClient).inSingletonScope();
container.bind<UnInstallWebClients>(TYPES.UnInstallWebClients).to(UnInstallWebClients).inSingletonScope();
container.bind<IServerSetup>(TYPES.NginxSetupServer).to(NginxSetupServer).inSingletonScope();
container.bind<IWebClientSetup>(TYPES.NginxSetupWebClient).to(NginxSetupWebClient).inSingletonScope();
container.bind<IUnInstallWebClient>(TYPES.NginxUnInstallWebClient).to(NginxUnInstallWebClient).inSingletonScope();
container.bind<IUniInstallSetup>(TYPES.NginxUnInstallServer).to(NginxUnInstallServer).inSingletonScope();
container.bind<SocketIo>(TYPES.SocketIo).to(SocketIo).inSingletonScope();

//Workers
container.bind<LogsWorker>(TYPES.LogsWorker).to(LogsWorker).inSingletonScope();
container.bind<SetupServerWorker>(TYPES.SetupServerWorker).to(SetupServerWorker).inSingletonScope();
container.bind<SetupWebClientWorker>(TYPES.SetupWebClientWorker).to(SetupWebClientWorker).inSingletonScope();
container.bind<UnInstallServerWorker>(TYPES.UnInstallServerWorker).to(UnInstallServerWorker).inSingletonScope();
container.bind<UnInstallWebClientWorker>(TYPES.UnInstallWebClientWorker).to(UnInstallWebClientWorker).inSingletonScope();

//Commands
container.bind<WebClientCommand>(TYPES.WebClientCommand).to(WebClientCommand).inSingletonScope();
container.bind<WorkSpaceCommand>(TYPES.WorkSpaceCommand).to(WorkSpaceCommand).inSingletonScope();
container.bind<ServerCommand>(TYPES.ServerCommand).to(ServerCommand).inSingletonScope();
container.bind<Commander>(TYPES.Commander).to(Commander).inSingletonScope();


export default container;