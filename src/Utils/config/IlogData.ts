export interface IlogData {
    REMOTE_HOSTNAME?:string;
    REMOTE_LOGNAME?:string;
    REMOTE_USER?:string;
    TIME_REQUEST?:string;
    FIRST_LINE_OF_REQUEST?:string;
    FINAL_STATUS?:string;
    SIZE_OF_RESPONSE_BYTES?:string;
    REFERER?:string;
    USER_AGENT?:string;
    BYTES_RECEIVED?:string;
    BYTES_SENT?:string;
    IP_LOCAL?:string;
    TIME_SERVIR_REQUEST?:string;
    REQUEST_METHOD?:string;
    QUERY_REQUEST?:string;
}
