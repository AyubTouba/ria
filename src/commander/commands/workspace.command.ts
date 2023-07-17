import { inject, injectable } from "inversify";
import {  SERVERS_TYPE_ARRAY } from "../../config/constant";
import TYPES from "../../config/types";
import { ServerConfigService } from "../../Database/services/serverConfigService";
import { WorkSpaceService } from "../../Database/services/workspaceService";
import { Commander } from "../commander";

const inquirer = require('inquirer');

@injectable()
export class WorkSpaceCommand {
    constructor(
        @inject(TYPES.Commander) private commander: Commander,
        @inject(TYPES.WorkSpaceService) private workSpaceService: WorkSpaceService,

      ) {
      

      }

      async getQuestions() {
        // webClient Questions
        
        const questions = [
            {
              type: 'input',
              name: 'name',
              message: 'Workspace name'
            },
            {
                type: 'input',
                name: 'username',
                message: 'Username company Account'
              },
            {
              type: 'input',
              name: 'password',
              message: 'password  company Account'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Email company Account'
            },
          ];

          return {questions}
        }   
        
        async  action(){
            const {questions} = await this.getQuestions();
            inquirer.prompt(questions).then( async (answers:any) =>{
              await this.workSpaceService.create(answers);
              this.commander.success('Workspace Created succesfully!');
              process.exit();
            });
        }
}
    



