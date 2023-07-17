export const WINDOWS_OS_CONFIG_CONF_FILE = `\n
<IfModule logio_module>
      # You need to enable mod_logio.c to use %I and %O
      LogFormat 'REMOTE_HOSTNAME|%h~REMOTE_LOGNAME|%l~REMOTE_USER|%u~TIME_REQUEST|%t~FIRST_LINE_OF_REQUEST|\"%r\"~FINAL_STATUS|%>s~SIZE_OF_RESPONSE_BYTES|%b~REFERER|\"%{Referer}i\"~USER_AGENT|\"%{User-Agent}i\"~IP_LOCAL|%A~TIME_SERVIR_REQUEST|%D~REQUEST_METHOD|%m~QUERY_REQUEST|%q~BYTES_RECEIVED|%I~BYTES_SENT|%O' tracker
    </IfModule>
     LogFormat 'REMOTE_HOSTNAME|%h~REMOTE_LOGNAME|%l~REMOTE_USER|%u~TIME_REQUEST|%t~FIRST_LINE_OF_REQUEST|\"%r\"~FINAL_STATUS|%>s~SIZE_OF_RESPONSE_BYTES|%b~REFERER|\"%{Referer}i\"~USER_AGENT|\"%{User-Agent}i\"~IP_LOCAL|%A~TIME_SERVIR_REQUEST|%D~REQUEST_METHOD|%m~QUERY_REQUEST|%q' tracker
    `
export const CONFIG_FILENAME = "tracker.conf"

export const CONFIG_FOLDERNAME = "webtracker"

export const EXSENTION_CONF = ".conf"

export const ERROR_LOG_WEBCLIENT = "_error"

export const TRACKER_TAG = "#WEBTRACKER"

export const STARTED_TAG = "#"