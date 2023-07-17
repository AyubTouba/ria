import { FileHelper } from "../../../src/Utils/File.helper";
import { AddTextFile, EditFile, RemoveTextFile, REMOVE_TYPE, WRITE_POSITION } from "../../../src/Utils/config/EditFile";
import { hostconf, textTest, textTestRemove } from "./resources/text";
import { STARTED_TAG } from "../../../src/Service/Servers/Apache/config/apache.const";

describe("File Helper", () => {
  describe("searchAndReplace", () => {
    it("should return a text with the modification", () => {
      let data = textTest.split("\n");
      let numberLineAdded = 1;
      let textTosearch = "tracker.test";
      let textToAdd: string = "test";
      let lineToAddNear = "</VirtualHost>";
      let addTextFile:AddTextFile = {data,textToAdd,textTosearch,lineToAddNear,position:WRITE_POSITION.UP_LINE}

      var result = FileHelper.searchAndAddText(addTextFile) as String[] ;
      var resultTostring = result ? result.join("\n") : "";
      result = resultTostring.split("\n") as String[];

      expect(result.length).toEqual(data.length + numberLineAdded);
    });

    it("should return the same text", () => {
      let data = textTest.split("\n");
      let textTosearch = "nosense";
      let textToAdd: string = "test";
      let lineToAddNear = "</VirtualHost>";
      let addTextFile:AddTextFile = {data,textToAdd,textTosearch,lineToAddNear,position:WRITE_POSITION.UP_LINE}

      var result = FileHelper.searchAndAddText(addTextFile);

      expect(result).toEqual(false);
    });
  });

  describe("isTextExist", () => {
    it("should return true after find the text", () => {
      let data = textTest.split("\n");
      let textTosearch = "tracker.test";
      var result = FileHelper.isTextExist(data, textTosearch);

      expect(result).toBeTruthy();
    });

    it("should search for a unknown text and return false  ", () => {
      let data = textTest.split("\n");
      let textTosearch = "blabla";
      var result = FileHelper.isTextExist(data, textTosearch);

      expect(result).toBeFalsy();
    });
  });

  describe("editFileSync", () => {
    it("should return a false after giving all the args but with a wrong path  ", () => {
      let serverName = "tracker.test";
      let text: string = "test";
      let searchON = "</VirtualHost>";
      let pathfile = "/wrongpath/var/testfile.txt";
      let args: EditFile = {
        pathfile,
        serverName,
        text,
        searchON,
        isTextExist: true,
        tagSearch: serverName,
        position:WRITE_POSITION.AFTER_SAME_LINE
      };

      var result = FileHelper.editFileSync(args);

      expect(result).toBeFalsy();
    });

    it("should return the pathfile after edit the file successfully  ", () => {
      let serverName = "lara.test";
      let text: string = "<test>Test </test> #test";
      let searchON = "</VirtualHost>";
      let pathfile: string = "./tests/Unit/Utils/resources/vh.test.conf";
      let args: EditFile = {
        pathfile,
        serverName,
        text,
        searchON,
        isTextExist: true,
        tagSearch: STARTED_TAG + serverName,
        position:WRITE_POSITION.UP_LINE
      };

      var result = FileHelper.editFileSync(args);

      expect(result).toEqual(pathfile);
    });
  });
  describe("searchAndDelete", () => {

    it("should return the string array wihout the line wanted ", () => {
      let data = textTestRemove.split("\n");
      let dataLentgh = data.length;
      let textTosearch = "#Test";
      let dataRemove: RemoveTextFile = {textTosearch,removeType:REMOVE_TYPE.EXACT_LINE}
      var result = FileHelper.searchAndDelete(data, dataRemove) as String[];
      expect(result.length).toEqual(dataLentgh - 1);
    });

    it("should return the string array wihout the 4 line wanted with AND_X_LINE_BEFORE ", () => {
      let data = textTestRemove.split("\n");
      let dataLentgh = data.length;
      let textTosearch = "#Test";
      let dataRemove: RemoveTextFile = {textTosearch,removeType:REMOVE_TYPE.AND_X_LINE_BEFORE,linesDelete:4}
      var result = FileHelper.searchAndDelete(data, dataRemove) as String[];
      expect(result.length).toEqual(dataLentgh - 5);
    });

    it("should return the string array wihout the 4 line wanted with AND_X_LINE_AFTER ", () => {
      let data = textTestRemove.split("\n");
      let dataLentgh = data.length;
      let textTosearch = "#Test";
      let dataRemove: RemoveTextFile = {textTosearch,removeType:REMOVE_TYPE.AND_X_LINE_AFTER,linesDelete:4}
      var result = FileHelper.searchAndDelete(data, dataRemove) as String[];
      expect(result.length).toEqual(dataLentgh - 5);
    });

    it("should return false after not find the text should deleted ", () => {
      let data = textTestRemove.split("\n");
      let textTosearch = "blabla";
      let dataRemove: RemoveTextFile = {textTosearch,removeType:REMOVE_TYPE.EXACT_LINE}
      var result = FileHelper.searchAndDelete(data, dataRemove) as String[];
      expect(result.length).toBeFalsy();
    });
  });

  describe("editRemoveFile", () => {

    it("should return a false after giving a wrong path ", () => {
      let text: string = "#test";
      let pathfile: string = "/var/wrongpath.txt";
      let dataRemove: RemoveTextFile = {textTosearch:text,removeType:REMOVE_TYPE.EXACT_LINE}
      var result = FileHelper.removeTextFile(pathfile, dataRemove);
    

      expect(result).toBeFalsy();
    });
  });
});