import container from "../../../../src/Config/inversify.config";
import TYPES from "../../../../src/Config/types";
import { DatabaseService } from "../../../../src/Database/services/DatabaseService";
import { WorkSpaceService } from "../../../../src/Database/services/WorkspaceService";
import * as mongoose from 'mongoose';
import { IWorkSpace } from "../../../../src/Database/models/Workspace";
beforeEach(async () => {
    await  container.get<DatabaseService>(TYPES.DatabaseService).connect() ;
  });
  
  afterEach(async () => {
    await container.get<WorkSpaceService>(TYPES.WorkSpaceService).remove({});
    await  container.get<DatabaseService>(TYPES.DatabaseService).disconnect() ;
  });

describe("WorkspaceService", () => {
  describe("create",  () => {
    it("Should insert workspace in the database ",async  () => {
      let newWorkspace ={name:"workspace_test"};

       const result  =   await  container.get<WorkSpaceService>(TYPES.WorkSpaceService).create(newWorkspace) ;

       expect(result.name).toEqual(newWorkspace.name);
    });
  });

  describe("update",  () => {
    it("Should update workspace exist in the database  ",async  () => {
      let newWorkspace ={name:"workspace_test"};
      let updatedworkspace = {name:"updatedTest"};
       const workspace  =   await  container.get<WorkSpaceService>(TYPES.WorkSpaceService).create(newWorkspace) ;
       const result  =   await  container.get<WorkSpaceService>(TYPES.WorkSpaceService).update(workspace._id,updatedworkspace) as IWorkSpace  ;

       expect(result?.name).toEqual(updatedworkspace.name);
    });

    it("Should return false update workspace with the wrong _ID ",async  () => {
      let updatedworkspace = {name:"updatedTest"};
      let wrong_Id =mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd");

       const result  =   await  container.get<WorkSpaceService>(TYPES.WorkSpaceService).update(wrong_Id,updatedworkspace) ;

       expect(result).toBeFalsy();

    });

  });

  describe("update",  () => {
    it("Should update workspace exist in the database  ",async  () => {
      let newWorkspace ={name:"workspace_test"};
      let updatedworkspace = {name:"updatedTest"};
       const workspace  =   await  container.get<WorkSpaceService>(TYPES.WorkSpaceService).create(newWorkspace) ;
       const result  =   await  container.get<WorkSpaceService>(TYPES.WorkSpaceService).update(workspace._id,updatedworkspace) as IWorkSpace ;

       expect(result?.name).toEqual(updatedworkspace.name);
    });

    it("Should return false update workspace with the wrong _ID ",async  () => {
      let updatedworkspace = {name:"updatedTest"};
      let wrong_Id =mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd");

       const result  =   await  container.get<WorkSpaceService>(TYPES.WorkSpaceService).update(wrong_Id,updatedworkspace) ;

       expect(result).toBeFalsy();

    });

  });

  describe("getAll",  () => {
    it("Should get All workspaces from the workspace document  ",async  () => {
      let newWorkspace ={name:"workspace_test"};
      let newWorkspace2 = {name:"updatedTest"};
      
       await  container.get<WorkSpaceService>(TYPES.WorkSpaceService).create(newWorkspace) ;
       await  container.get<WorkSpaceService>(TYPES.WorkSpaceService).create(newWorkspace2) ;
       const result = await container.get<WorkSpaceService>(TYPES.WorkSpaceService).getAll();

       expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining(newWorkspace),
        expect.objectContaining(newWorkspace2)
      ]));

    });

   

  });
    
});