import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { SERVERS_TYPE } from '../../config/constant';

const serverConfigSchema = new mongoose.Schema({
    name: String,
    config_file: String,
    config_file_tracker:  {type: String,default: ''},
    folder_config:String,
    folder_config_tracker:  {type: String,default: ''},
    is_configured: {type: Boolean,default: false},
    is_deleted: {type: Boolean,default: false},
    server_type:String,
    created_at: {type: Date,default: Date.now},
    workSpace: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"WorkSpace"
    }
})


export interface IserverConfig extends mongoose.Document,IserverConfigEntity {

}

/**
 * @category Database 
 * @subcategory  models
 */
export interface IserverConfigEntity {
   /**
    * @property {string}  name 
    */
    name: string;
    config_file: string;
    config_file_tracker?:string;
    created_at?: Date;
    workSpace:ObjectId;
    folder_config:string;
    folder_config_tracker?: string;
    is_configured?:boolean;
    server_type:SERVERS_TYPE;
    is_deleted?:boolean;
}

export const  ServerConfig = mongoose.model('ServerConfig',serverConfigSchema);

// Export the model and return your IserverConfig interface
export default mongoose.model<IserverConfig>('ServerConfig',serverConfigSchema);