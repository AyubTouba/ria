import { inject, injectable } from "inversify";
import {  SERVERS_TYPE_ARRAY } from "../../config/constant";
import TYPES from "../../config/types";
import { ServerConfigService } from "../../Database/services/serverConfigService";
import { WorkSpaceService } from "../../Database/services/workspaceService";
import { Commander } from "../commander";

const inquirer = require('inquirer');

@injectable()
export class ServerCommand {
    constructor(
        @inject(TYPES.ServerConfigService) private serverConfigService: ServerConfigService,
        @inject(TYPES.WorkSpaceService) private workSpaceService: WorkSpaceService,
        @inject(TYPES.Commander) private commander: Commander,

      ) {
      

      }

      async AddCmdQuestions() {
        const workSpaces = await this.workSpaceService.getAll();
        const workSpaceName = workSpaces.map(sr => sr.name); 
        // webClient Questions
        
        const questions = [
            {
              type: 'input',
              name: 'name',
              message: 'Server name'
            },
            {
              type: 'input',
              name: 'config_file',
              message: 'Server config file path'
            },
            {
              type: 'input',
              name: 'folder_config',
              message: 'Server folder config path'
            },
            {
              type: 'list',
              name: 'server_type',
              message: 'Server type',
              choices:SERVERS_TYPE_ARRAY
            },
            {
                type: 'list',
                name: 'workSpace',
                message: 'WorkSpace',
                choices:workSpaceName
            },
          ];

          return {questions,workSpaces}
        }   
        
        async  addAction(){
            const {questions,workSpaces} = await this.AddCmdQuestions();
            inquirer.prompt(questions).then( async (answers:any) =>{
              answers.workSpace = workSpaces.filter(sr => sr.name == answers.workSpace )[0]._id;
              await this.serverConfigService.create(answers);
              this.commander.success('Server Created succesfully!');
              process.exit();
              return ;
            });
        }

         ///Delete webclient
         async deletecmdQuestions() {
        
          const questions = [
              {
                type: 'input',
                name: 'server_name',
                message: 'Webclient Server name to delete'
              },
              {
                type: 'confirm',
                name: 'confirmation',
                message: 'Are you sure to delete this webclient'
              },
            ];
  
            return {questions}
          }   
          
          async  deleteAction(){
              const {questions} = await this.deletecmdQuestions();
              inquirer.prompt(questions).then( async (answers:any) =>{
                if(answers.confirmation) {
             const server =   await this.serverConfigService.getOne({server_name:answers.server_name})
               if(server) {
                server.is_deleted = true;
                await this.serverConfigService.update(server._id,server)
                this.commander.success('Server Deleted succesfulyy succesfully!');
               }else {
                this.commander.error('There\'s no Server with this server name');
               }
               process.exit();
                  return ;
                }
              });
          }
}
    



