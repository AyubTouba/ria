import { ObjectId } from "mongodb";

/**
 * @classdesc IsocketData is representing of data send to socket
 * @category Service 
 * @subcategory  Logger 
 */
export interface IsocketData {
      /**
     * webClientId: is the webclientid has new logrequets ,
     */
    webClientId: ObjectId;
    
}