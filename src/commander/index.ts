#! /usr/bin/env node
import "reflect-metadata";
require('dotenv').config();
import { Application } from "../application";


import container from "../config/inversify.config";
import { logger } from "../config/log.winston";
import TYPES from "../config/types";
import { Commander } from "./commander";
import { ServerCommand } from "./commands/server.command";
import {  WebClientCommand } from "./commands/webclient.command";
import { WorkSpaceCommand } from "./commands/workspace.command";
const program = require('commander');





// Create Commands
(async () => {

  await container.get<Commander>(TYPES.Commander).bootstrap();

  program 
  .version('0.1.0')
  .description('Ria engine CLI')

  program
  .command('add <type>')
  .alias('a')
  .description('Add an entity of:  [webclient|server|workspace]')
  .action( (type:string) => {
      switch (type) {
          case 'webclient':
            container.get<WebClientCommand>(TYPES.WebClientCommand).addAction();
              break;
          case 'server':
            container.get<ServerCommand>(TYPES.ServerCommand).addAction();
               break;
          case 'workspace':
            container.get<WorkSpaceCommand>(TYPES.WorkSpaceCommand).action();
                break;
          default:
           container.get<Commander>(TYPES.Commander).error("Please choose a type (webclient/server/workspace)");
              break;
      }
  });

  program
  .command('delete <type>')
  .alias('d')
  .description('delete an entity of:  [webclient|server|workspace]')
  .action( (type:string) => {
      switch (type) {
          case 'webclient':
            container.get<WebClientCommand>(TYPES.WebClientCommand).deleteAction();
              break;
          case 'server':
            container.get<ServerCommand>(TYPES.ServerCommand).deleteAction();
               break;
          case 'workspace':
            container.get<WorkSpaceCommand>(TYPES.WorkSpaceCommand).action();
                break;
          default:
           container.get<Commander>(TYPES.Commander).error("Please choose a type (webclient/server/workspace)");
              break;
      }

  });

  program
  .command('run')
  .alias('r')
  .description('Run the ria engine ')
  .action(() => {
    logger.log({
      level: 'info',
      message: `WebTracker Started ....`,
    });
    container.get<Application>(TYPES.Application).run() ;
  });


 
 

  await program.parseAsync(process.argv);

})()
