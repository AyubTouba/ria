import { injectable, inject } from "inversify";
import TYPES from "../config/types";
import { DatabaseService } from "../Database/services/databaseService";
const chalk = require('chalk');
@injectable()
export class Commander {
  

    constructor (
        @inject(TYPES.DatabaseService) private databaseService: DatabaseService,

    ) {}
  
   async bootstrap() {
        await this.databaseService.connect();
    }

    error(string:string): void{
       return console.log(chalk.bold.red(string));
    }
   
    success(string:string) : void {
        return console.log(chalk.bold.green(string));
    }
}