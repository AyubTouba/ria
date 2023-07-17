import * as mongoose from 'mongoose';

const workSpaceSchema = new mongoose.Schema({
    name: String,
    created_at: {type: Date,default: Date.now},
})

export interface IWorkSpace extends mongoose.Document,IWorkSpaceEntity {
}

export interface IWorkSpaceEntity {
    name: string;
}
export const  WorkSpace = mongoose.model('WorkSpace',workSpaceSchema);

// Export the model and return your IWorkSpace interface
export default mongoose.model<IWorkSpace>('WorkSpace',workSpaceSchema);