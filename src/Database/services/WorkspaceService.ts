import Workspace, { IWorkSpace, IWorkSpaceEntity } from '../models/workspace';
import { ObjectID } from 'mongodb';
import { injectable } from "inversify";

@injectable()
export class WorkSpaceService  {

   async create(workSpaceData :IWorkSpaceEntity): Promise<IWorkSpace> {
       const workspace = new Workspace({
           name : workSpaceData.name
       });
        return await workspace.save();
    }

    async update(id:ObjectID,workSpaceData :IWorkSpaceEntity): Promise<IWorkSpace | boolean> {
        const workspace = await Workspace.findById(id);
        if(!workspace) return false;

        workspace.name  = workSpaceData.name ? workSpaceData.name :  workspace.name  ;

         return await workspace.save();
     }

    async getAll(query:any= {}) : Promise<IWorkSpace[]>{
         return await Workspace.find(query);
     }

     async remove(query:any) : Promise<any>{
        return await Workspace.remove(query);
    }
}