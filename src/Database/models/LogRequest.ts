import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { IlogData } from '../../utils/config/ilogData';

const logRequestSchema = new mongoose.Schema({
    description: String,
    logs : {},
    created_at: {type: Date,default: Date.now},
    webclient: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"WebClient"
    },
})




export interface ILogRequest extends mongoose.Document,ILogRequestEntity {
}

/**
 * @category Database 
 * @subcategory  models
 */
export interface ILogRequestEntity {
     /**
     * description: description of the request,
     */
    description?: string;
     /**
     * created_at: date creation ,
     */
    created_at?: Date;
     /**
     * webclient:webclient ,
     */
    webclient:ObjectId;
    /**
     * logs:logs ,
     */
    logs:IlogData;
}

export const  LogRequest = mongoose.model('LogRequest',logRequestSchema);

// Export the model and return your IwebConfig interface
export default mongoose.model<ILogRequest>('LogRequest',logRequestSchema);