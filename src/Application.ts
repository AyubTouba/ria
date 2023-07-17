import { DatabaseService } from "./Database/services/databaseService";
import TYPES from "./config/types";

import { injectable,inject } from "inversify";
import { LogsWorker } from "./worker/logs.worker";
import { SetupServerWorker } from "./worker/setupServer.worker";
import { SetupWebClientWorker } from "./worker/setupWebClient.worker";
import { UnInstallServerWorker } from "./worker/unInstallServer.worker";
import { UnInstallWebClientWorker } from "./worker/unInstallWebClient.worker";
import { SocketIo } from "./service/socket/socket";
@injectable()
export class Application {

    constructor (
     @inject(TYPES.DatabaseService) private databaseService: DatabaseService,
     @inject(TYPES.LogsWorker) private LogsWorker: LogsWorker,
     @inject(TYPES.SetupServerWorker) private setupServerWorker: SetupServerWorker,
     @inject(TYPES.SetupWebClientWorker) private setupWebClientWorker: SetupWebClientWorker,
     @inject(TYPES.UnInstallServerWorker) private unInstallServerWorker : UnInstallServerWorker,
     @inject(TYPES.UnInstallWebClientWorker) private unInstallWebClientWorker : UnInstallWebClientWorker,

    ) {}
    async run() : Promise<void> {
        await this.databaseService.connect();

        SocketIo.run();
        /**
         * Lanche the Logs worker to check files logs for the webclient already configured 
         */
         this.LogsWorker.run();

          /**
         * Lanche the Server Setup worker to check Servers to setup
         */
          this.setupServerWorker.run();

          /**
         * Lanche the Server Setup worker to check WebClient to setup
         */
         this.setupWebClientWorker.run();

        /**
         * Lanche the Server Unistall worker to check Server to Unistall
         */
         this.unInstallServerWorker.run();

        /**
         * Lanche the Webclient Unistall worker to check Webclient to Unistall
         */
        this.unInstallWebClientWorker.run();
            
    }
} 