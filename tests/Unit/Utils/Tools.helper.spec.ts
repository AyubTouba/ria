import { ToolsHelper } from "../../../src/Utils/Tools.helper";
import { FILE_SEPARATOR } from "../../../src/Config/Constant";


describe('Tools Helper', () => {

  describe('concactFolderWFile', () => {
    it('Should concatenate the folder path and file name with the exact right separator ', () => {
        let folderPath:string = "/var/apache/log";
        let filename:string ="testlog.txt";
       
        let path = folderPath + FILE_SEPARATOR + filename;
        let result  = ToolsHelper.concactFolderWFile(folderPath,filename)

       expect(result).toEqual(path);
    });

    it('Should concatenate the folder path (has the opposite separator) and  file name with the exact right separator ', () => {
      let folderPath:string = "\\var\\apache\\log";
      let filename:string ="testlog.txt";
     
      let path =  "/var/apache/log" + FILE_SEPARATOR + filename;
      let result  = ToolsHelper.concactFolderWFile(folderPath,filename)

     expect(result).toEqual(path);
      });

      it('Should concatenate the folder path (has the a separator at the end ) and  file name with the exact right separator ', () => {
        let folderPath:string = "/var/apache/log/";
        let filename:string ="testlog.txt";
       
        let path =  "/var/apache/log" + FILE_SEPARATOR + filename;
        let result  = ToolsHelper.concactFolderWFile(folderPath,filename)
  
       expect(result).toEqual(path);
    });
  
  })

})