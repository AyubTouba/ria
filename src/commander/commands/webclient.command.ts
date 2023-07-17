import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { ServerConfigService } from "../../Database/services/serverConfigService";
import { WebClientService } from "../../Database/services/webClientService";
import { WorkSpaceService } from "../../Database/services/workspaceService";
import { Commander } from "../commander";

const inquirer = require('inquirer');

@injectable()
export class WebClientCommand {
    constructor(
        @inject(TYPES.ServerConfigService) private serverConfigService: ServerConfigService,
        @inject(TYPES.WorkSpaceService) private workSpaceService: WorkSpaceService,
        @inject(TYPES.WebClientService) private webClientService: WebClientService,
        @inject(TYPES.Commander) private commander: Commander,

      ) {
      

      }

      async addQuestions() {
        const servers = await this.serverConfigService.getAll();
        const workSpaces = await this.workSpaceService.getAll();
        const serversName = servers.map(sr => sr.name);
        const workSpaceName = workSpaces.map(sr => sr.name); 
        // webClient Questions
        
        const questions = [
            {
              type: 'input',
              name: 'domain',
              message: 'Webclient domain',
              validate: (input:string) => {
                if(input.length == 0){
                  this.commander.error('Please insert the domaine');
                  return;
                } 
                return true;
              }
            },
            {
              type: 'input',
              name: 'server_name',
              message: 'Webclient Server name'
            },
            {
              type: 'input',
              name: 'virtual_host_file',
              message: 'Webclient virtual host file path'
            },
            {
              type: 'input',
              name: 'path_log_folder',
              message: 'Log folder path'
            },
            {
                type: 'input',
                name: 'path_log_folder',
                message: 'Log folder path'
            },
            {
                type: 'list',
                name: 'workSpace',
                message: 'WorkSpace',
                choices:workSpaceName
            },
            {
                type: 'list',
                name: 'server',
                message: "Webclient's server",
                choices:serversName
            }
          ];

          return {servers,questions,workSpaces}
        }   
        
        async  addAction(){
            const {questions,servers,workSpaces} = await this.addQuestions();
            inquirer.prompt(questions).then( async (answers:any) =>{
              answers.server = servers.filter(sr => sr.name == answers.server )[0]._id;
              answers.workSpace = workSpaces.filter(sr => sr.name == answers.workSpace )[0]._id;
              await this.webClientService.create(answers);
              this.commander.success('WebClient Created succesfully!');
              process.exit();
            });
        }

       
        ///Delete webclient
        async deleteQuestions() {
        
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
              const {questions} = await this.deleteQuestions();
              inquirer.prompt(questions).then( async (answers:any) =>{
                if(answers.confirmation) {
             const webclient =   await this.webClientService.getOne({server_name:answers.server_name})
               if(webclient) {
                webclient.is_deleted = true;
                await this.webClientService.update(webclient._id,webclient)
                this.commander.success('WebClient Deleted succesfulyy succesfully!');
               }else {
                this.commander.error('There\'s no webclient with this server name');
               }
               process.exit();
                  return ;
                }
              });
          }
}
    



