import "reflect-metadata";
require('dotenv').config();
import { Application } from "./application";
import container from "./config/inversify.config";
import TYPES from "./config/types";
import { logger } from "./config/log.winston";

(async () => {
          logger.log({
            level: 'info',
            message: `WebTracker Started ....`,
          });
        await  container.get<Application>(TYPES.Application).run() ;
     
      })()


   
 


