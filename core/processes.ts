import { EntitySchemaQuery } from './db/esq';
import { isFeatureEnabled } from './features';
import { Resources } from './interfaces/resources';
import { requireAsync } from './require';
import { Guid } from './structures/guid';
import { formatString } from 'typescript-string-operations';
import { ErrorInfo } from './types/errors';

export interface ProcessRequest {
  sysProcessName?: string
  sysProcessId?: Guid | string
  parameters?: object
  resultParameters?: Array<string>
}

export interface ProcessByIdRequest {
  sysProcessId: Guid | string
  sysProcessName?: string
  parameters?: object
  resultParameters?: Array<string>
}

export interface ProcessResponse {
  success: boolean
  resultParameterValues?: object
  errorInfo?: ErrorInfo
}

const getRunProcessOptions = (config: ProcessRequest): any => ({
  schemaName: config.sysProcessName,
  parameterValues: window.Terrasoft.ProcessModuleUtilities._convertRequestParameters(config.parameters),
  resultParameterNames: config.resultParameters
});

const getProcessById = async(sysProcessId: Guid | string): Promise<any> => {
  const esq = new EntitySchemaQuery({
    rootSchemaName: 'VwSysProcess',
    rowCount: 1
  });
  esq.addColumn('Name');
  esq.enablePrimaryColumnFilter(sysProcessId);
  return await esq.queryFirst();
};

const getProcessByIdNotFoundResponse = (resources: Resources, sysProcessId?: Guid | string): ProcessResponse => ({
  errorInfo: {
    message: formatString(
      resources.localizableStrings.ProcessSchemaNotFound,
      sysProcessId)
  },
  success: false
});

const canGetNextProcessStepsViaResponse = (): boolean => isFeatureEnabled('GetProcessStepsViaResponse');

const runProcess = (config: ProcessRequest): Promise<ProcessResponse> => {
  if (canGetNextProcessStepsViaResponse()) {
    const options = getRunProcessOptions(config);
    return new Promise(resolve => window.Terrasoft.ProcessEngineUtilities.runProcess(
      options, resolve));
  } else {
    return new Promise(resolve => window.Terrasoft.ProcessModuleUtilities._runProcessOld(
      config.sysProcessName, config.parameters, resolve));
  }
};

export const executeProcess = (config: ProcessRequest): Promise<ProcessResponse> => {
  if (config.sysProcessName) {
    return runProcess(config);
  } else {
    return executeProcessById(config as ProcessByIdRequest);
  }
};

export const executeProcessById = async(config: ProcessByIdRequest): Promise<ProcessResponse> => {
  const process = await getProcessById(config.sysProcessId);

  if (process) {
    config.sysProcessName = process.$Name;
    return runProcess(config);
  } else {
    const resources = await requireAsync(['ProcessModuleUtilitiesResources']);
    return getProcessByIdNotFoundResponse(resources, config.sysProcessId);
  }
};
