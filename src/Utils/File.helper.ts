import { logger } from "../config/log.winston";
import { EditFile, AddTextFile, WRITE_POSITION, RemoveTextFile, REMOVE_TYPE } from "./config/editFile";
const fs = require("fs");
const rimraf = require("rimraf");


/**
 * @classdesc FileHelper contians All I/O methods needed.
 * @category Utils
 */
export class FileHelper {

  /**
   *  Append a text on an existing file 
   * @param  {String} pathFile path file 
   * @param  {String} dataText text to write on the file 
   * @returns {String | boolean} return the path when the treatement end with success or false if something wrong happend 
   */
  static writeInFileSync(pathFile: string, dataText: string): string | false {
    try {
      fs.appendFileSync(pathFile, dataText);
      logger.log({
        level: "info",
        message: "Writing Succesfully in file : " + pathFile,
      });
      return pathFile;
    } catch (err) {
      logger.log({
        level: "error",
        message: "Failed writing in file : " + pathFile,
        additional: err,
      });
      return false;
    }
  }
  /**
   * Create and write in file with the text given
   * @param  {String} pathFile path file 
   * @param  {String} dataText text to write on the file 
   * @returns {String | boolean} return the path when the treatement end with success or false if something wrong happend 
   */
  static createAndWriteInFile(pathFile: string, dataText: string): string | false {
    try {
      if (fs.existsSync(pathFile)) 
        return pathFile;
       fs.writeFileSync(pathFile, dataText);
      logger.log({
        level: "info",
        message: "create and Writing Succesfully in file : " + pathFile,
      });
      return pathFile;
    } catch (err) {
      logger.log({
        level: "error",
        message: "Failed create and  writing in file : " + pathFile,
        additional: err,
      });
      return false;
    }
  }
  
    /**
     *  delete folder with all files and folder it coutaines 
     * @param  {String} pathFolder
     * @returns {String | boolean} return the path when the treatement end with success or false if something wrong happend 
     */
    static deleteFolderSync(pathFolder: string): boolean {
      try {
        rimraf.sync(pathFolder)
              logger.log({
                level: "info",
                message: "Folder Delete Succesfully : " + pathFolder,
              });
              return true; 
          }catch (err) {
              if (err) {
                logger.log({
                  level: "error",
                  message:"Error on delete Folder " + pathFolder ,
                  additional : err,
                });
              return false;
              }
        }
        return false;
    }     

  /**
   * Check if folder or file given it exist 
   * @param  {String} pathFolder path folder/file
   * @returns Boolean  
   */
  static isFileExist(pathFolder:string) : boolean {
    return fs.existsSync(pathFolder);
  }   
  
  /**
   *  Create Folder 
   * @param  {String} pathFolder path folder 
   * @returns {String | boolean} return the path when the treatement end with success or false if something wrong happend 
   */
  static createFolder(pathFolder: string): string | false {
    try {
      if (!fs.existsSync(pathFolder)) {
        fs.mkdirSync(pathFolder);
        logger.log({
          level: "info",
          message: "Folder created Succesfully : " + pathFolder,
        });
      }
      return pathFolder;
    } catch (err) {
      if (err) {
        logger.log({
          level: "error",
          message: err,
        });
        return false;
      }
    }
    return false;
  }

  /**
   *  Edit File 
   * @param  {EditFile} editFile
   * @returns {String | boolean} return the path when the treatement end with success or false if something wrong happend 
   */
  static editFileSync(editFile:EditFile): string | false {
    try {
    let  data =  fs.readFileSync(editFile.pathfile);
        if(data != undefined || data != "") {

          data = data.toString().split("\n");

          if((editFile.isTextExist && !this.isTextExist(data,editFile.tagSearch)) || !editFile.isTextExist) {
          const dataSearch:AddTextFile = {data:data,textTosearch:editFile.serverName,
            textToAdd:editFile.text,lineToAddNear:editFile.searchON,position:editFile.position};
            data = FileHelper.searchAndAddText(dataSearch);
           if(!data) return false ;

           const writeStream = fs.createWriteStream(editFile.pathfile);
            writeStream.write(data.join("\n"));
            writeStream.end();
            return editFile.pathfile;
          }
        }
        return false;
        
    } catch (err) {
      if (err) {
        logger.log({
          level: "error",
          message: err,
        });
        return false;
      }
    }
    return false;
  }
    
   /**
    *  Search text on Data given and Add a text to a Position given
    * @param  {AddTextFile} searchData
    * @returns {String | boolean} return the data  when the treatement end with success or false if something wrong happend 
    */
   static searchAndAddText(searchData:AddTextFile): string[] | boolean {
        
        for (const line in searchData.data) {
          if(searchData.data[line].search(searchData.textTosearch) != -1){
          for(let i = +line;i < searchData.data.length;i++) {

                  if(searchData.data[i].search(searchData.lineToAddNear) != -1){
                         switch (searchData.position) {
                          case WRITE_POSITION.BEFORE_SAME_LINE:
                            searchData.data[i] = searchData.textToAdd + " " + searchData.data[i];
                             break;
                          case WRITE_POSITION.AFTER_SAME_LINE:
                            searchData.data[i] = searchData.data[i]  + " " + searchData.textToAdd;
                               break;
                          case WRITE_POSITION.DOWN_LINE:
                            searchData.data[i] = searchData.data[i]  + " \n  " + searchData.textToAdd;
                                 break;
                          case WRITE_POSITION.UP_LINE:
                            searchData.data[i] = searchData.textToAdd + " \n  " + searchData.data[i];
                                   break;
                         }
                    
                    return searchData.data;
                }

              }
          }
      }
      return false;
      }
  
  /**
   *  Check if text given Exist on Data given
   * @param  {Array<String>} data
   * @param  {string} textTosearch
   * @returns Boolean 
   */
  static isTextExist(data:Array<string>,textTosearch:string) : boolean {
        
        for (const line in data) {
          if(data[line].search(textTosearch) != -1){
             return true;
          }
      }
      return false;
    }
  
    /**
     *  Search text on Data given and delete it from a position given
     * @param  {Array<string>} data
     * @param  {RemoveTextFile} dataRemove
     * @returns any
     */
    static searchAndDelete(data:Array<string>,dataRemove:RemoveTextFile) : string[] | boolean {
        let index = 0;
        const  linesDeletebefore = dataRemove.linesDelete ? dataRemove.linesDelete + 1 : 0;
      for (const line in data) {
        if(data[line].search(dataRemove.textTosearch) != -1){
            switch (dataRemove.removeType) {
              case REMOVE_TYPE.EXACT_LINE:
                      data[line] = "";
                      data.splice(index, 1);
                break;
              case REMOVE_TYPE.AND_X_LINE_AFTER:
                     data.splice(index,linesDeletebefore);
                 break;
              case REMOVE_TYPE.AND_X_LINE_BEFORE:
                  data.splice((index-(linesDeletebefore-1)), linesDeletebefore);
                 break;
            
              default:
                break;
            }
          return data;
        }
        index++;
    }
    return false;
    }
  
    /**
     *  Remove a text given from a file 
     * @param  {String} pathfile path file 
     * @param  {RemoveTextFile} dataRemove 
     * @returns any
     */
    static removeTextFile(pathfile:string,dataRemove:RemoveTextFile) : string | false {
      try {
          let data =  fs.readFileSync(pathfile);
        if( data != undefined || data != "") {
         data = data.toString().split("\n");
           data = FileHelper.searchAndDelete(data,dataRemove);
          if(!data) return false ;

          const writeStream = fs.createWriteStream(pathfile);
          writeStream.write(data.join("\n"));
            writeStream.end();
            return pathfile;
        }
        return false;
      } catch (err) {
        if (err) {
          logger.log({
            level: "error",
            message: err,
          });
          return false;
        }
      }
      return false ;
    }

    /**
     *  delete file
     * @param  {any} filepath file path 
     * @returns Boolean
     */
    static deleteFileSync(filepath:string) : boolean {
      try {
        fs.unlinkSync(filepath);
        logger.log({
          level: "info",
          message: "File deleted Succesfully : " + filepath,
        });
        return true; 
      } catch (err) {
        logger.log({
          level: "error",
          message: err,
        });
        return false ; 
      }
    }

}
