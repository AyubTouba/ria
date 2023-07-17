import { ToolsHelper } from "../../../../utils/tools.helper";
import { EXTENSION_LOG, LOG_FORMAT_NAME } from "../../../../config/constant";
import { ERROR_LOG_WEBCLIENT } from "./apache.const";

/**
 * @classdesc ApacheHelper is a helper for apache service 
 * @category Service 
 * @subcategory  Apache 
 */
export class ApacheHelper {
    
   /**
    * @param  {string} text path to include 
    * @param  {string} tag tag to specify the include line
    *  @returns {string}
    */
   static addIncludeToLine(text ="",tag:string) : string{
       return  tag + '\n Include "' + text +'" ';
   }
   /**
    * @param  {string} pathFolderLog path Folder Log
    * @param  {string} fileName filename
    * @returns  {string}
    */
   static getTextLog(pathFolderLog:string,fileName:string):string {
    return `CustomLog "${ToolsHelper.concactFolderWFile(pathFolderLog,fileName+EXTENSION_LOG)}" ${LOG_FORMAT_NAME}
    ErrorLog  "${ToolsHelper.concactFolderWFile(pathFolderLog,fileName+ERROR_LOG_WEBCLIENT+EXTENSION_LOG)}"`
}
}