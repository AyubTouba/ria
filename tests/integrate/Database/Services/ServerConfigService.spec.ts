import container from "../../../../src/Config/inversify.config";
import TYPES from "../../../../src/Config/types";
import { DatabaseService } from "../../../../src/Database/services/DatabaseService";
import { WorkSpaceService } from "../../../../src/Database/services/WorkspaceService";
import * as mongoose from "mongoose";
import { SERVERS_TYPE } from "../../../../src/Config/Constant";
import { ServerConfigService } from "../../../../src/Database/services/ServerConfigService";

beforeEach(async () => {
  await container.get<DatabaseService>(TYPES.DatabaseService).connect();
});

afterEach(async () => {
  await container.get<ServerConfigService>(TYPES.ServerConfigService).remove({});
  await container.get<WorkSpaceService>(TYPES.WorkSpaceService).remove({});
  await container.get<DatabaseService>(TYPES.DatabaseService).disconnect();
});



describe("ServerConfigService", () => {

  describe("create", () => {
    it("Should insert ConfigService in the database ", async () => {
      let newWorkspace = { name: "workspace_test_insert" };
      const workspace = await container.get<WorkSpaceService>(
        TYPES.WorkSpaceService,
      ).create(newWorkspace);
      let newconfigServer = {
        name: "Server One",
        config_file: "/var/apache/conf.txt",
        workSpace: workspace._id,
        folder_config: "/var/apache/config",
        server_type: SERVERS_TYPE.APACHE,
      };

      const result = await container.get<ServerConfigService>(
        TYPES.ServerConfigService,
      ).create(newconfigServer);

      expect(result).toEqual(expect.objectContaining(newconfigServer));
    });
  });

  describe("update", () => {
    it("Should update the  ConfigService with new data  ", async () => {
      let newWorkspace = { name: "workspace_test_update" };
      const workspace = await container.get<WorkSpaceService>(
        TYPES.WorkSpaceService,
      ).create(newWorkspace);
      let newconfigServer = {
        name: "Server One",
        config_file: "/var/apache/conf.txt",
        workSpace: workspace._id,
        folder_config: "/var/apache/config",
        server_type: SERVERS_TYPE.APACHE,
      };

      let UpdatedconfigServer = {
        name: "Server One",
        config_file: "/var/apache/conf.txt",
        workSpace: workspace._id,
        folder_config: "/var/apache/config",
        server_type: SERVERS_TYPE.APACHE,
      };

      const configServer = await container.get<ServerConfigService>(
        TYPES.ServerConfigService,
      ).create(newconfigServer);
      const result = await container.get<ServerConfigService>(
        TYPES.ServerConfigService,
      ).update(configServer._id, UpdatedconfigServer);

      expect(result).toEqual(expect.objectContaining(UpdatedconfigServer));

    
    });

    it("Should return false update workspace with the wrong _ID ", async () => {
      let UpdatedconfigServer = {
        name: "Server One",
        config_file: "/var/apache/conf.txt",
        folder_config: "/var/apache/config",
        server_type: SERVERS_TYPE.APACHE,
        folder_config_tracker: "/var/apache/tracker",
        is_configured: true,
        workSpace: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        config_file_tracker: "/var/apache/tracker/tracker.conf",
      };
      let wrong_Id = mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd");

      const result = await container.get<ServerConfigService>(
        TYPES.ServerConfigService,
      ).update(wrong_Id, UpdatedconfigServer);

      expect(result).toBeFalsy();
    });
  });

  describe("getAll", () => {
    it("Should get All configServers ", async () => {
      let newWorkspace = { name: "workspace_test_all" };
      const workspace = await container.get<WorkSpaceService>(
        TYPES.WorkSpaceService,
      ).create(newWorkspace);
      let configServer = {
        name: "Server One_all",
        config_file: "/var/apache/conf.txt",
        workSpace: workspace._id,
        folder_config: "/var/apache/config",
        server_type: SERVERS_TYPE.APACHE,
      };

      let configServer2 = {
        name: "Server two_all",
        config_file: "/var/apache/confs.txt",
        workSpace: workspace._id,
        folder_config: "/var/apache/",
        server_type: SERVERS_TYPE.APACHE,
      };
       await container.get<ServerConfigService>(
        TYPES.ServerConfigService,
      ).create(configServer);
       await container.get<ServerConfigService>(
        TYPES.ServerConfigService,
      ).create(configServer2);

      
      //delete workspace for testing
      delete configServer.workSpace;
      delete configServer2.workSpace;
      
      const result = await container.get<ServerConfigService>(
        TYPES.ServerConfigService,
      ).getAll();

      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining(configServer),
        expect.objectContaining(configServer2),
      ]));
    });
  });

 
});