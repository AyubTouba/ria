import * as constant from "../config/constant";

/**
 * @classdesc ToolsHelper contians utils method .
 * @category Utils
 */
export class ToolsHelper {
    

    /**
     *  Concact folder path with the filename by taking in considiration the file separator 
     * @param  {String} folderPath
     * @param  {String} fileName
     * @returns String
     */
    static concactFolderWFile(folderPath:string,fileName:string) : string {
        folderPath = folderPath.replace(/\\/g,constant.FILE_SEPARATOR);
         if(folderPath.slice(-1) == constant.FILE_SEPARATOR)
                 return `${folderPath}${fileName}` ;
         
         return folderPath+constant.FILE_SEPARATOR+fileName;
    }

    /**
     * Remove spaces from a text given
     * @param  {String} text
     * @returns String
     */
    static removeSpace(text:string) : string {
       return  text.replace(/\s/g, '');
    }
   
}