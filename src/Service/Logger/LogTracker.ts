import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { IwebConfig } from "../../Database/models/webClient";
import { LogRequestService } from "../../Database/services/logRequestService";
import { ObjectID } from "mongodb";
import * as constant from "../../config/constant";
import { IlogData } from "../../utils/config/ilogData";
import { WebClientService } from "../../Database/services/webClientService";
import { logger } from "../../config/log.winston";
import { FileHelper } from "../../utils/file.helper";
import { SocketIo } from "../socket/socket";
import * as config  from "config";
import { IsocketData } from "./isocketData";

/**
 * @classdesc LogTracker is a service respansible of saving logs from files to the MongoDb 
 * @category Service 
 * @subcategory  Logger 
 */
@injectable()
export class LogTracker {

  /**
   * @param  {LogRequestService} privatelogRequestService
   * @param  {WebClientService} privatewebClientService
   * @class
   */
  constructor(
    @inject(TYPES.LogRequestService) private logRequestService:
      LogRequestService,
    @inject(TYPES.WebClientService) private webClientService: WebClientService,
  ) {}

  
  /**
   *  Log function is to run the LogTracker service
   */
  async log() : Promise<void> {
    const websites = await this.filesTowatch();

        for(const website of websites) 
        {   
          
             this.readFileAddToDatabase(website);
        }
      
  }

   
  /**
   * get log files for the web clients who are configured
   * @returns  Promise<IwebConfig[]>
   */
  async filesTowatch() : Promise<IwebConfig[]>  {
    return  await this.webClientService.getAll({is_configured : true},{lastline:1,logFile:1,_id:1,server:0,workSpace:0});
    }


    
 
  /**
   * this function add the line read from the log to the logRequest Table 
   *  with structuring the datalog by @see IlogData
   * @param  {String} line line read from the log file
   * @param  {ObjectID} webClientid  ObjectId of the webClient
   * @returns Promise<void>
   */
  async  addToDatabase(line: string, webClientid: ObjectID) : Promise<void> {

        try {
            const data: any = line.split(constant.SEPARATOR_LOGS);
            let dataLog:any = {} ;
            let value:any = null;
            let dataColmun = [];
              for(const colmun of data) {
                   dataColmun = colmun.split(constant.SEPARATOR_LOGS_COLMUNS);
                   value = dataColmun[1] ? dataColmun[1] : "" ;
                   dataLog[dataColmun[0]] = value;  
              }

              dataLog = dataLog as IlogData;
              
           const result =  await this.logRequestService.create({
                logs: dataLog,
                webclient :webClientid
            });
          
           logger.log({
            level: 'info',
            message: "Logs added to Database",
            additional:result,
          });
        } catch (error) {
            logger.log({
                level: 'error',
                message: error,
              });
        }
   
  } 

  /**
   * 
   *  This function read log file for the configured webApp line per line 
   * then add to database by calling @link addToDatabase function.
   * set the lastline read to the webapp
   * and finaly send a socket message to API Tracker that thewebclient has a new logrequests
   * @param {IwebConfig} website
   */
  async readFileAddToDatabase(website: IwebConfig) : Promise<false | undefined> {
   
    try {
        if(!FileHelper.isFileExist(website.logFile+""))
            {
              logger.log({
                level: 'warn',
                message: 'File log doesn\'t exist!!' ,
              });
              return false;
            }
    const lineReader = require("readline").createInterface({
      input: require("fs").createReadStream(website.logFile),
    });
    let numberLine = 1;
     lineReader.on("line", async  (line: string) => {
       const lastLine:number = website.lastline ? website.lastline : 0;
      if (numberLine > lastLine) {
           if(line.trim().length != 0) {
        
               this.addToDatabase(line,website._id);
           }
      }
      numberLine++;
    }).on('close',async () => {
            if(numberLine != website.lastline )
                  await this.webClientService.updateLine(website._id,numberLine-1);
                  const data:IsocketData= {webClientId:website._id};
                  // To do: deprecated :
                  SocketIo.setEvent(config.get("Socket.serverEvent"),data);
      }); 
   } catch (error) {
      logger.log({
                    level: 'error',
                    message: 'Error raise durring log tracking!!' ,
                    additional:error
                  });
   }
    
  }
}
