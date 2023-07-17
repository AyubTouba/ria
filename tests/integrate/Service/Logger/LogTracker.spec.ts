import container from "../../../../src/Config/inversify.config";
import TYPES from "../../../../src/Config/types";
import { DatabaseService } from "../../../../src/Database/services/DatabaseService";
import { WebClientService } from "../../../../src/Database/services/WebClientService";
import * as mongoose from "mongoose";
import { LogTracker } from "../../../../src/Service/Logger/LogTracker";
import { LogRequestService } from "../../../../src/Database/services/LogRequestService";
import { IlogData } from "../../../../src/Utils/config/IlogData";

beforeEach(async () => {
    await container.get<DatabaseService>(TYPES.DatabaseService).connect();
   
  });
  
  afterEach(async () => {
   await container.get<WebClientService>(TYPES.WebClientService).remove({});
    await container.get<LogRequestService>(TYPES.LogRequestService).remove({});
    await container.get<DatabaseService>(TYPES.DatabaseService).disconnect();
  });

  describe("LogTracker", () => {

    describe("addToDatabase", () => {

        it("Should insert the log line into logrequest document with the exact IlogData Object", async () => {
            var newWebClient = {
                domain: "http://www.web1.com",
                server: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
                workSpace: mongoose.Types.ObjectId("5AAd28b6f8918e56a8d2c3dd"),
                path_log_folder: "/var/http/log",
                virtual_host_file: "/var/http/httpd.conf",
                server_name: "web.1",
              };
            const webClient = await container.get<WebClientService>(
                TYPES.WebClientService,
              ).create(newWebClient);
            let lineOfFile:string = `REMOTE_HOSTNAME|127.0.0.1~REMOTE_LOGNAME|127.0.0.1~REMOTE_USER|-~TIME_REQUEST|03/Oct/2020:15:03:52 +0000~FINAL_STATUS|200~SIZE_OF_RESPONSE_BYTES|%b~REFERER|"http://demotrack.test:8080/contact/create"~USER_AGENT|"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"~TIME_SERVIR_REQUEST|0.539~REQUEST_METHOD|GET~QUERY_REQUEST|-~BYTES_RECEIVED|7592~BYTES_SENT|7675
            `;

             await container.get<LogTracker>(TYPES.LogTracker).addToDatabase(lineOfFile,webClient._id);
             const logRequest = await container.get<LogRequestService>(TYPES.LogRequestService).
             getAll({webclient:webClient._id})

             expect(logRequest[0].logs.FINAL_STATUS).toEqual('200');
             expect(logRequest[0].logs.REMOTE_HOSTNAME).toEqual('127.0.0.1');
             
        });
    });

    describe("filesTowatch", () => {
        
        it("Should get one webclient who is configured", async () => {
            var newWebClient = {
                domain: "http://www.web1.com",
                server: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
                workSpace: mongoose.Types.ObjectId("5AAd28b6f8918e56a8d2c3dd"),
                path_log_folder: "/var/http/log",
                virtual_host_file: "/var/http/httpd.conf",
                server_name: "web.1",
                is_configured: true,
              };
            
            var newWebClientNotConfigured = {
                domain: "http://www.tst.com",
                server: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
                workSpace: mongoose.Types.ObjectId("5AAd28b6f8918e56a8d2c3dd"),
                path_log_folder: "/var/http/log",
                virtual_host_file: "/var/http/httpd.conf",
                server_name: "web.1",
                is_configured: false
              };
            await container.get<WebClientService>(
                TYPES.WebClientService,
              ).create(newWebClient);
            await container.get<WebClientService>(
                TYPES.WebClientService,
              ).create(newWebClientNotConfigured);
                
          const filestoWatch =await container.get<LogTracker>(TYPES.LogTracker).filesTowatch();

          expect(filestoWatch.length).toEqual(1);
        });
    });

  });
  