import container from "../../../../src/Config/inversify.config";
import TYPES from "../../../../src/Config/types";
import { DatabaseService } from "../../../../src/Database/services/DatabaseService";
import * as mongoose from "mongoose";
import { LogRequestService } from "../../../../src/Database/services/LogRequestService";
import { IlogData } from "../../../../src/Utils/config/IlogData";

beforeEach(async () => {
  await container.get<DatabaseService>(TYPES.DatabaseService).connect();
});

afterEach(async () => {
  await container.get<LogRequestService>(TYPES.LogRequestService).remove({});
  await container.get<DatabaseService>(TYPES.DatabaseService).disconnect();
});

describe("LogRequestService", () => {
  describe("create", () => {
    it("Should insert LogRequest in the database ", async () => {
      let logData: IlogData = {
        "REMOTE_HOSTNAME": "https",
        "REMOTE_LOGNAME": "404",
      };
      let newLogRequest = {
        description: "Log ..",
        webclient: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        logs: logData,
      };

      const result = await container.get<LogRequestService>(
        TYPES.LogRequestService,
      ).create(newLogRequest);

      expect(result).toEqual(expect.objectContaining(newLogRequest));
    });
  });

  describe("update", () => {
    it("Should update the LogRequest with new data  ", async () => {
      let logData: IlogData = {
        "REMOTE_HOSTNAME": "https",
        "REMOTE_LOGNAME": "404",
      };
      let logDataUpdated: IlogData = {
        "REMOTE_HOSTNAME": "test",
        "REMOTE_LOGNAME": "505",
      };
      let newLogRequest = {
        description: "Log ..",
        webclient: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        logs: logData,
      };

      const LogRequest = await container.get<LogRequestService>(
        TYPES.LogRequestService,
      ).create(newLogRequest);

      let UpdatedLogRequest = {
        description: "Log update ..",
        webclient: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        logs: logDataUpdated,
      };

      const result = await container.get<LogRequestService>(
        TYPES.LogRequestService,
      ).update(LogRequest._id, UpdatedLogRequest);

      expect(result).toEqual(expect.objectContaining(UpdatedLogRequest));
    });

    it("Should return false update LogRequest with the wrong _ID ", async () => {
      let logDataUpdated: IlogData = {
        "REMOTE_HOSTNAME": "test",
        "REMOTE_LOGNAME": "505",
      };

      let UpdatedLogRequest = {
        description: "Log update ..",
        webclient: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        logs: logDataUpdated,
      };
      let wrong_Id = mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd");

      const result = await container.get<LogRequestService>(
        TYPES.LogRequestService,
      ).update(wrong_Id, UpdatedLogRequest);

      expect(result).toBeFalsy();
    });
  });

  describe("getAll", () => {
    it("Should get All logRequests ", async () => {
      let logData: IlogData = {
        "REMOTE_HOSTNAME": "https",
        "REMOTE_LOGNAME": "404",
      };
      let logData2: IlogData = {
        "REMOTE_HOSTNAME": "test",
        "REMOTE_LOGNAME": "505",
      };
      let newLogRequest = {
        description: "Log ..",
        webclient: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        logs: logData,
      };

      let newLogRequest2 = {
        description: "Log update ..",
        webclient: mongoose.Types.ObjectId("5f4d28b6f8918e56a8d2c3dd"),
        logs: logData2,
      };

       await container.get<LogRequestService>(
        TYPES.LogRequestService,
      ).create(newLogRequest);

        await container.get<LogRequestService>(
        TYPES.LogRequestService,
      ).create(newLogRequest2);

      const result = await container.get<LogRequestService>(
        TYPES.LogRequestService,
      ).getAll();

      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining(newLogRequest),
        expect.objectContaining(newLogRequest2),
      ]));
    });
  });
});