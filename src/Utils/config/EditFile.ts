export class EditFile{
    pathfile!: string;
    serverName!: string;
    text!: string;
    searchON!: string;
    isTextExist!: boolean;
    tagSearch!: string;
    position!: WRITE_POSITION;
}

export class AddTextFile{
    data!:Array<string>;
    textTosearch!:string;
    textToAdd!:string;
    lineToAddNear!:string;
    position: WRITE_POSITION = WRITE_POSITION.BEFORE_SAME_LINE;
}

export class RemoveTextFile{
    textTosearch!:string;
    removeType: REMOVE_TYPE = REMOVE_TYPE.EXACT_LINE;
    linesDelete?:number = 0;
}

export enum WRITE_POSITION {
    UP_LINE = 1,
    DOWN_LINE = 2,
    SAME_LINE = 3,
    AFTER_SAME_LINE = 4,
    BEFORE_SAME_LINE= 5,
}

export enum REMOVE_TYPE {
    EXACT_LINE = 1,
    AND_X_LINE_AFTER = 2,
    AND_X_LINE_BEFORE = 3,
}