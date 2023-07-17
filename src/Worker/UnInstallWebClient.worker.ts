import { inject, injectable } from "inversify";
import TYPES from "../config/types";
import { Iworker } from "./interfaces/Iworker";
import { CRON_DELAY } from "../config/constant";
import { logger } from "../config/log.winston";
import { UnInstallWebClients } from "../Service/Servers/unInstallWebClient";
const CronJob = require('cron').CronJob;

@injectable()
export class UnInstallWebClientWorker implements Iworker {
   
    constructor(
        @inject(TYPES.UnInstallWebClients) private servers: UnInstallWebClients
        ){}

    async run(): Promise<void>{
        
        this.worker();
    }

     worker(): void {
        const job = new CronJob(CRON_DELAY.EXECUTE_EVERY_10_SECONDS, () => {
            this.servers.uninstall();
            const d = new Date();
            logger.log({
                level: 'info',
                message: 'Check WebClient for Uninstall ...'+ d,
              });
        });

        job.start();
       
    }


}