import { EXTENSION_LOG, LOG_FORMAT_NAME } from "../../../../config/constant";
import { ToolsHelper } from "../../../../utils/tools.helper";

export class NginxHelper {
    
    static addIncludeToLine(text ="",tag:string):string {
        return  tag + '\n include "' + text +'"; ';
    }
 
    static getTextLog(pathFolderLog:string,fileName:string):string {
     return ` access_log ${ToolsHelper.concactFolderWFile(pathFolderLog,fileName+EXTENSION_LOG)} ${LOG_FORMAT_NAME} ;`
 }
 }