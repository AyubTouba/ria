import { EXTENSION_LOG } from "../../../../../../src/Config/Constant";
import { ERROR_LOG_WEBCLIENT, TRACKER_TAG } from "../../../../../../src/Service/Servers/Apache/config/apache.const";
import { ApacheHelper } from "../../../../../../src/Service/Servers/Apache/config/apacheHelper";
import { ToolsHelper } from "../../../../../../src/Utils/Tools.helper";

describe("Apache Helper", () => {
  describe("addIncludeToLine", () => {
    it("Should a text with include the right include sentence  ", () => {
      let text: string = "webtracker.test";

      const result = ApacheHelper.addIncludeToLine(text,TRACKER_TAG);

      expect(result).toEqual(TRACKER_TAG + '\n Include "' + text +'" ');
    });

    describe("addIncludeToLine", () => {
      it("Should get the right text with the exact constant  ", () => {
        let pathFolderLog: string = "/var/www/test";
        let fileName: string = "test.txt";
        let textlog= `CustomLog "${ToolsHelper.concactFolderWFile(pathFolderLog,fileName+EXTENSION_LOG)}" tracker
        ErrorLog  "${ToolsHelper.concactFolderWFile(pathFolderLog,fileName+ERROR_LOG_WEBCLIENT+EXTENSION_LOG)}"`
        const result = ApacheHelper.getTextLog(pathFolderLog,fileName);

        expect(result.replace(/\s/g, '')).toMatch(textlog.replace(/\s/g, ''));
      });
    });
  });
});