export const WINDOWS_OS_CONFIG_CONF_FILE = `\n
log_format  tracker 'REMOTE_HOSTNAME|$remote_addr~REMOTE_LOGNAME|$realip_remote_addr~REMOTE_USER|$remote_user~TIME_REQUEST|$time_local~FINAL_STATUS|$status~SIZE_OF_RESPONSE_BYTES|%b~REFERER|"$http_referer"~USER_AGENT|"$http_user_agent"~TIME_SERVIR_REQUEST|$upstream_response_time~REQUEST_METHOD|$request_method~QUERY_REQUEST|$query_string~BYTES_RECEIVED|$upstream_bytes_received~BYTES_SENT|$bytes_sent';`;
export const CONFIG_FILENAME = "tracker.conf"

export const CONFIG_FOLDERNAME = "webtracker"

export const EXSENTION_CONF = ".conf"

export const ERROR_LOG_WEBCLIENT = "_error"

export const TRACKER_TAG = "#WEBTRACKER"

export const STARTED_TAG = "#"

export const FORMAT_TO_SEARCH = "http {"
