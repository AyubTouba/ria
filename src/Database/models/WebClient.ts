import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { IserverConfigEntity } from './serverConfig';

const webConfigSchema = new mongoose.Schema({
    domain: String,
    ip_client: String,
    lastline:{type: Number,default:0},
    server_name:String,
    virtual_host_file:String,
    path_log_folder:String,
    conf_tracker_file: {type: String,default: ''},
    is_configured: {type: Boolean,default: false},
    is_deleted: {type: Boolean,default: false},
    logFile:{type: String,default: ''},
    created_at: {type: Date,default: Date.now},
    workSpace: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"WorkSpace"
    },
    server: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"ServerConfig"
    }
})




export interface IwebConfig extends mongoose.Document,IwebConfigEntity {

}

export interface IwebConfigEntity {
    domain?: string;
    ip_client?: string,
    created_at?: Date;
    server: ObjectId | IserverConfigEntity;
    workSpace:ObjectId;
    logFile?:string;
    path_log_folder:string;
    virtual_host_file:string;
    server_name:string;
    conf_tracker_file?:string;
    is_deleted?:boolean;
    is_configured?:boolean;
    lastline?:number;
}

export const  WebConfig = mongoose.model('WebClient',webConfigSchema);

// Export the model and return your IwebConfig interface
export default mongoose.model<IwebConfig>('WebClient',webConfigSchema);