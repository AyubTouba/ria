import { ObjectID } from 'mongodb';
import { injectable } from "inversify";
import WebConfig, { IwebConfig, IwebConfigEntity} from '../models/webClient';

/**
 * @category Database 
 * @subcategory  services 
 * @classdesc WebClientService is CRUD service of web Client Document on mongoDb database   
 */
@injectable()
export class WebClientService  {

   /**
    * save a webconfig document 
    * @param  {IwebConfigEntity} webConfigData webConfig Data
    */
   async create(webConfigData :IwebConfigEntity) : Promise<IwebConfig> {
       const webConfig = new WebConfig({
           domain : webConfigData.domain,
           server : webConfigData.server,
           workSpace: webConfigData.workSpace,
           logFile:webConfigData.logFile,
           path_log_folder:webConfigData.path_log_folder,
           virtual_host_file:webConfigData.virtual_host_file,
           server_name:webConfigData.server_name,
           is_configured: webConfigData.is_configured? webConfigData.is_configured : false 
       });
        return await webConfig.save();
    }


    /**
     * update the last line attribute on webConfig document 
     * @param  {ObjectID} id _id  of the webConfig document to edit
     * @param  {Number} lastLine the new value of the last line attribute
     */
    async updateLine(id:ObjectID,lastLine:number) : Promise<IwebConfig | boolean> {
        const webConfig = await WebConfig.findById(id);
        if(!webConfig) return false;

        webConfig.lastline  = lastLine;
         return await webConfig.save();
     }

    /**
     *  update  webConfig document 
     * @param  {ObjectID} id _id  of the webConfig document to edit
     * @param  {IwebConfigEntity} webConfigData webConfig Data
     */
    async update(id:ObjectID,webConfigData :IwebConfigEntity): Promise<IwebConfig | false> {
        const webConfig = await WebConfig.findById(id);
        if(!webConfig) return false;

        webConfig.domain = webConfigData.domain ? webConfigData.domain : webConfig.domain ;
       // webConfig.server = webConfigData.server;
        webConfig.workSpace  = webConfigData.workSpace ? webConfigData.workSpace : webConfig.workSpace ;
        webConfig.logFile=webConfigData.logFile  ? webConfigData.logFile : webConfig.logFile ;
        webConfig.path_log_folder=webConfigData.path_log_folder ? webConfigData.path_log_folder : webConfig.path_log_folder ;
        webConfig.virtual_host_file=webConfigData.virtual_host_file  ? webConfigData.virtual_host_file : webConfig.virtual_host_file ;
        webConfig.server_name=webConfigData.server_name  ? webConfigData.server_name : webConfig.server_name ;
        webConfig.is_configured = webConfigData.is_configured  
        webConfig.conf_tracker_file = webConfigData.conf_tracker_file  ? webConfigData.conf_tracker_file : webConfig.conf_tracker_file ;
        webConfig.is_deleted =  webConfigData.is_deleted;
        return await webConfig.save();
     }

      /**
     * get All webConfig
     * @param  {any} query query to filter the result 
     */
    async getAll(query:any= {},select:any = null) : Promise<IwebConfig[]>{
        const result =  WebConfig.find(query,select);
        
        result.populate('workSpace','-_id -__v -created_at')
                               .populate('server','-_id -__v -created_at');
         return await result;
     }

      /**
     * get one webConfig
     * @param  {any} query query to filter the result 
     */
    async getOne(query:any= {}) : Promise<IwebConfig | null>{
        return await WebConfig.findOne(query)
                              .populate('server','-_id -__v -created_at');
    }

     /**
     * delete a webConfig
     * @param  {any} query query to specify what to delete 
     */
     async remove(query:any): Promise<any> {
        return await WebConfig.remove(query);
    }

    
}