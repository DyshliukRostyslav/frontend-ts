import { Guid } from "../structures/guid"
import { ErrorInfo } from "./errors"

export interface ProcessRequest {
  sysProcessName?: string
  sysProcessId?: Guid | string
  parameters?: object
  resultParameters?: Array<string>
}

export interface ProcessResponse {
  success: boolean
  resultParameterValues?: object
  errorInfo?: ErrorInfo
}
