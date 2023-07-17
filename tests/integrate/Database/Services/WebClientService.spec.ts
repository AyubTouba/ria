import container from "../../../../src/Config/inversify.config";
import TYPES from "../../../../src/Config/types";
import { DatabaseService } from "../../../../src/Database/services/DatabaseService";
import * as mongoose from "mongoose";
import { WebClientService } from "../../../../src/Database/services/WebClientService";

beforeEach(async () => {
  await container.get<DatabaseService>(TYPES.DatabaseService).connect();
});

afterEach(async () => {
  await container.get<WebClientService>(TYPES.WebClientService).remove({});
  await container.get<DatabaseService>(TYPES.DatabaseService).disconnect();
});

describe("WebClientService", () => {

  describe("create", () => {
    it("Should insert WebClient in the database ", async () => {
      let newWebClient = {
        domain: "http://www.web1.com",
        server: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        workSpace: mongoose.Types.ObjectId("5AAd28b6f8918e56a8d2c3dd"),
        path_log_folder: "/var/http/log",
        virtual_host_file: "/var/http/httpd.conf",
        server_name: "web.1",
        lastline:0
      };
      const result = await container.get<WebClientService>(
        TYPES.WebClientService,
      ).create(newWebClient);

      expect(result).toEqual(expect.objectContaining(newWebClient));
      
    });
  });
  
  
  describe("update", () => {
    it("Should update the ConfigService with new data  ", async () => {
      let newWebClient = {
        domain: "http://www.web1.com",
        server: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        workSpace: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        path_log_folder: "/var/http/log",
        virtual_host_file: "/var/http/httpd.conf",
        server_name: "web.1",
        is_configured: false,
        lastline:0
      };
      const webClient = await container.get<WebClientService>(
        TYPES.WebClientService,
      ).create(newWebClient);

      let UpdatedWebClient = {
        domain: "http://www.webedited.com",
        server: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        workSpace: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        path_log_folder: "/var/httpr/edited",
        virtual_host_file: "/var/httpedited/httpd.conf",
        server_name: "web.4",
        is_configured: false,
        lastline:0
      };

      const result = await container.get<WebClientService>(
        TYPES.WebClientService,
      ).update(webClient._id, UpdatedWebClient);

      expect(result).toEqual(expect.objectContaining(UpdatedWebClient));

    });

    it("Should return false update ConfigService with the wrong _ID ", async () => {
      let UpdatedWebClient = {
        domain: "http://www.webedited.com",
        server: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        workSpace: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        path_log_folder: "/var/httpr/edited",
        virtual_host_file: "/var/httpedited/httpd.conf",
        server_name: "web.4",
        is_configured: false,
      };
      let wrong_Id = mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd");

      const result = await container.get<WebClientService>(
        TYPES.WebClientService,
      ).update(wrong_Id, UpdatedWebClient);

      expect(result).toBeFalsy();
    });
  });

  describe("getAll", () => {
    it("Should get All webclient ", async () => {
      let newWebClient = {
        domain: "http://www.web1.com",
        server: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        workSpace: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        path_log_folder: "/var/http/log",
        virtual_host_file: "/var/http/httpd.conf",
        server_name: "web.9",
        is_configured: false,
      };

      let newWebClientSecand = {
        domain: "http://www.web2.com",
        server: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        workSpace: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        path_log_folder: "/var/https/logos",
        virtual_host_file: "/var/httd/https.conf",
        server_name: "web.10",
        is_configured: false,
      };

      const webClient = await container.get<WebClientService>(
        TYPES.WebClientService,
      ).create(newWebClient);

      const webClient2 = await container.get<WebClientService>(
        TYPES.WebClientService,
      ).create(newWebClientSecand);

      const result = await container.get<WebClientService>(
        TYPES.WebClientService,
      ).getAll();

      expect(result[0].server_name).toEqual(webClient.server_name);
      expect(result[1].server_name).toEqual(webClient2.server_name);
        
    });
  });

  
});