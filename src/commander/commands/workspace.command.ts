import { inject, injectable } from "inversify";
import { ROLES, SERVERS_TYPE_ARRAY } from "../../config/constant";
import TYPES from "../../config/types";
import { ServerConfigService } from "../../Database/services/serverConfigService";
import { UserService } from "../../Database/services/UserService";
import { WorkSpaceService } from "../../Database/services/workspaceService";
import { Commander } from "../commander";

const inquirer = require("inquirer");

@injectable()
export class WorkSpaceCommand {
  constructor(
    @inject(TYPES.Commander) private commander: Commander,
    @inject(TYPES.WorkSpaceService) private workSpaceService: WorkSpaceService,
    @inject(TYPES.UserService) private userService: UserService
  ) {}

  async getQuestions() {
    // webClient Questions

    const questions = [
      {
        type: "input",
        name: "name",
        message: "Workspace name",
      },
      {
        type: "input",
        name: "username",
        message: "Username company Account",
      },
      {
        type: "input",
        name: "password",
        message: "password  company Account",
      },
      {
        type: "input",
        name: "email",
        message: "Email company Account",
      },
    ];

    return { questions };
  }

  async action() {
    const { questions } = await this.getQuestions();
    inquirer.prompt(questions).then(async (answers: any) => {
      const workspace = await this.workSpaceService.create(answers);
      this.commander.success("Workspace Created succesfully!");

      await this.userService.create({
        username: answers.username,
        password: answers.password,
        role: ROLES.WORKSPACE_ADMIN,
        workSpace: workspace._id,
        email: answers.email,
      });
      this.commander.success("Admin Created succesfully!");
      process.exit();
    });
  }
}
