import { inject, injectable } from "inversify";
import TYPES from "../config/types";
import { Iworker } from "./interfaces/Iworker";
import { CRON_DELAY } from "../config/constant";
import { logger } from "../config/log.winston";
import { SetupWebClients } from "../Service/Servers/setupWebClient";
const CronJob = require('cron').CronJob;

@injectable()
export class SetupWebClientWorker implements Iworker {
   
    constructor(
        @inject(TYPES.WebClients) private webClient: SetupWebClients
        ){}

    async run(): Promise<void>{
        
        this.worker();
    }

     worker(): void {
        const job = new CronJob(CRON_DELAY.EXECUTE_EVERY_10_SECONDS, () => {
            this.webClient.setup();
            const d = new Date();
            logger.log({
                level: 'info',
                message: 'Check webClient for setup ...'+ d,
              });
        });

        job.start();
       
    }


}