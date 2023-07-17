import { inject, injectable } from "inversify";
import TYPES from "../config/types";
import { Iworker } from "./interfaces/Iworker";
import { CRON_DELAY } from "../config/constant";
import { logger } from "../config/log.winston";
import { SetupServers } from "../Service/Servers/setupServers";
const CronJob = require('cron').CronJob;

@injectable()
export class SetupServerWorker implements Iworker {
   
    constructor(
        @inject(TYPES.Servers) private servers: SetupServers
        ){}

    async run(): Promise<void>{
        
        this.worker();
    }

     worker(): void {
        const job = new CronJob(CRON_DELAY.EXECUTE_EVERY_10_SECONDS, () => {
            this.servers.setup();
            const d = new Date();
            logger.log({
                level: 'info',
                message: 'Check servers for setup ...'+ d,
              });
        });

        job.start();
       
    }


}