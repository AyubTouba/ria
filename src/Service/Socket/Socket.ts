import { injectable } from "inversify";
const io = require('socket.io-client');
import * as config  from "config";
import { logger } from "../../config/log.winston";

/**
 * @classdesc Socket is a service respansible of connexion between Ria engine and Api project
 * @category Service 
 * @subcategory  Socket 
 */
@injectable()
export class SocketIo {

  static socket: any;

   static run(server:string= config.get("Socket.server")) : void {
    this.socket = io.connect(server, {reconnect: true});

    this.socket.on('connect', (data:unknown ='') => {
        logger.log({  level: 'info', message: "Connected to Socket" });
    });

    this.socket.on('client', (data:unknown) => {
     // logger.log({  level: 'info', message: "received event client",additional:data});
  });
    //either 'io server disconnect' or 'io client disconnect'
    this.socket.on('disconnect', (reason:unknown) => {
        console.log("client disconnected");
        if (reason === 'io server disconnect') {
          // the disconnection was initiated by the server, you need to reconnect manually
          logger.log({  level: 'info', message: "server disconnected the client, trying to reconnect"});
          this.socket.connect();
        }else{
            logger.log({  level: 'info', message: "trying to reconnect again with server"});
        }
        // else the socket will automatically try to reconnect
      });

      this.socket.on('error', (error:unknown) => {
        logger.log({  level: 'error', message: error});
    });
   }
   
   static setEvent(event:string,data:unknown) : void{
       if(!this.socket)
          this.run();

    this.socket.emit(event,data);
   }
}
