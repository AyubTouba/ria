import { ObjectID } from 'mongodb';
import { injectable } from "inversify";
import LogRequest, { ILogRequest, ILogRequestEntity } from '../models/logRequest';


/**
 * @category Database 
 * @subcategory  services 
 * @classdesc LogRequestService is CRUD service of LogRequest Document on mongoDb database   
 */
@injectable()
export class LogRequestService  {

   /**
    * save a logRequest document 
    * @param  {ILogRequestEntity} requestLogData log request data
    */
   async create(requestLogData :ILogRequestEntity): Promise<ILogRequest> {
       const logRequest = new LogRequest({
           description : requestLogData.description,
           webclient : requestLogData.webclient,
           logs: requestLogData.logs,
       });
        return await logRequest.save();
    }
    /**
     * update a logRequest document 
     * @param  {ObjectID} id id of the log request document to edit
     * @param  {ILogRequestEntity} requestLogData log request data
     */
    async update(id:ObjectID,requestLogData :ILogRequestEntity): Promise<ILogRequest | boolean> {
        const logRequest = await LogRequest.findById(id);
        if(!logRequest) return false;

        logRequest.description = requestLogData.description ?  requestLogData.description : logRequest.description ;
        logRequest.webclient = requestLogData.webclient ? requestLogData.webclient : logRequest.webclient ;
        logRequest.logs  = requestLogData.logs  ? requestLogData.logs : logRequest.logs ; 
         return await logRequest.save();
     }

    /**
     * get All log request 
     * @param  {any} query query to filter the result 
     */
    async getAll(query:any= {}): Promise<ILogRequest[]> {
         return await LogRequest.find(query)
                               .populate('webClient','-_id -__v -created_at');
     }

    /**
     * get one log request 
     * @param  {any} query query to filter the result 
     */
     async getOne(query:any= {}) :  Promise<ILogRequest | null>  {
        return await LogRequest.findOne(query)
                              .populate('webClient','-_id -__v -created_at');
    }

     /**
     * remove log request 
     * @param  {any} query query to specify what to delete 
     */
     async remove(query:any) : Promise<any> {
        return await LogRequest.remove(query);
    }
}