import { ObjectID } from 'mongodb';
import { injectable } from "inversify";
import ServerConfig, { IserverConfig, IserverConfigEntity } from '../models/serverConfig';


/**
 * @category Database 
 * @subcategory  services 
 * @classdesc ServerConfigService is CRUD service of server config Document on mongoDb database   
 */
@injectable()
export class ServerConfigService  {
    
   /**
    * save a server config 
    * @param  {IserverConfigEntity} serverConfigeData server config data
    */
   async create(serverConfigeData :IserverConfigEntity) : Promise<IserverConfig> {
       const configServer = new ServerConfig({
           name : serverConfigeData.name,
           config_file : serverConfigeData.config_file,
           config_file_tracker : serverConfigeData.config_file_tracker,
           workSpace:serverConfigeData.workSpace,
           folder_config:serverConfigeData.folder_config,
           folder_config_tracker: serverConfigeData.folder_config_tracker,
           is_configured: serverConfigeData.is_configured,
           server_type:serverConfigeData.server_type
       });
        return await configServer.save();
    }

    /**
     * update a serverConfig document 
     * @param  {ObjectID} id  id of the server config document to edit
     * @param  {IserverConfigEntity} serverConfigeData  server config data
     */
    async update(id:ObjectID,serverConfigeData :IserverConfigEntity) : Promise<IserverConfig | boolean> {
        const configServer = await ServerConfig.findById(id);
        if(!configServer) return false;

        configServer.name  = serverConfigeData.name ? serverConfigeData.name :  configServer.name ;
        configServer.config_file = serverConfigeData.config_file ? serverConfigeData.config_file :  configServer.config_file ;
        configServer.config_file_tracker = serverConfigeData.config_file_tracker ? serverConfigeData.config_file_tracker :  configServer.config_file_tracker ;
        configServer.workSpace  = serverConfigeData.workSpace ? serverConfigeData.workSpace :  configServer.workSpace ;
        configServer.folder_config = serverConfigeData.folder_config ? serverConfigeData.folder_config :  configServer.folder_config ;
        configServer.folder_config_tracker =  serverConfigeData.folder_config_tracker ? serverConfigeData.folder_config_tracker :  configServer.folder_config_tracker ;
        configServer.is_configured =  serverConfigeData.is_configured ;
        configServer.is_deleted =  serverConfigeData.is_deleted;
         return await configServer.save();
     }

     /**
     * get All serverConfig
     * @param  {any} query query to filter the result 
     */
    async getAll(query:any= {},select:any = null) : Promise<IserverConfig[]>{
         return await ServerConfig.find(query,select).populate('workSpace','-__v -created_at');
     }

     /**
     * get one serverConfig
     * @param  {any} query query to filter the result 
     */
    async getOne(query:any= {}) : Promise<IserverConfig | null> {
        return await ServerConfig.findOne(query)
                              .populate('workSpace','-_id -__v -created_at');
    }

     /**
     * delete a serverConfig
     * @param  {any} query query to specify what to delete 
     */
     async remove(query:any) : Promise<any> {
        return await ServerConfig.remove(query);
    }
}