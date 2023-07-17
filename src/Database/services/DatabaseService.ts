import * as mongoose from 'mongoose';
import { injectable } from "inversify";
import { logger } from '../../config/log.winston';
import * as config  from "config";


/**
 * @category Database 
 * @subcategory  services 
 * @classdesc DatabaseService is a service responsible of manage connect/disconnect the Database  
 */
@injectable()
export class DatabaseService {
   /**
    * Connect function is for connecting the mongoDb database 
    */
   async connect() : Promise<any> {
       const mongo_server =  config.get("DbConfig.mongo_server");
       const mongo_db =  config.get("DbConfig.mongo_database");
       return  mongoose.connect(mongo_server+"/"+mongo_db,{ useNewUrlParser: true , useUnifiedTopology: true})
        .then(() => {
          /*  logger.log({
                level: 'info',
                message: "DATABASE Connected ....",
              });*/
        })
        .catch(err => {
            logger.log({
                level: 'error',
                message: "Error in Database connexion....",
                additional: err,
              });
        })
    }

     /**
    * disconnect function is for disconnecting the mongoDb database 
    */
    async disconnect(): Promise<any>{
        return  mongoose.connection.close()
         .then(() => {
             logger.log({
                 level: 'info',
                 message: "DATABASE disconnected ....",
               });
         })
         .catch(err => {
             logger.log({
                 level: 'error',
                 message: "Error in disconnecting Database ....",
                 additional: err,
               });
         })
     }
}