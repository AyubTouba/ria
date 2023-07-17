import { inject, injectable } from "inversify";
import TYPES from "../config/types";
import { Iworker } from "./interfaces/Iworker";
import { LogTracker } from "../Service/logger/logTracker";
import { CRON_DELAY } from "../config/constant";
import { logger } from "../config/log.winston";
const CronJob = require('cron').CronJob;

@injectable()
export class LogsWorker implements Iworker {
   
    constructor(
        @inject(TYPES.LogTracker) private logTracker: LogTracker
        ){}

    async run() : Promise<void> {
        
        this.worker();
    }

     worker(): void {
        const job = new CronJob(CRON_DELAY.EXECUTE_EVERY_10_SECONDS, () => {
            this.logTracker.log();
            const d = new Date();
            logger.log({
                level: 'info',
                message: 'LogsWorker Execute...'+ d,
              });
        });

        job.start();
       
    }


    /*
    WatchFiles(logfiles:IwebConfig[]) {
       var  files =  logfiles.map((website:IwebConfig) => website.logFile);
       let $this = this;
        watch(files, function(evt:any, pathfile:any)  {
            if (evt == 'update') {
               let website:IwebConfig | undefined  = logfiles.find((website:IwebConfig) => website.logFile === pathfile);
               logger.log({
                level: 'info',
                message: "File Changed:" + pathfile,
              });
               //if(website != undefined)
               //$this.logTracker.log(website);
              }
        });
    }
   */

}