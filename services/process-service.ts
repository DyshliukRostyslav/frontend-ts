import { Resources } from "../interfaces/resources";
import { requireAsync } from "../require";
import { Guid } from "../structures/guid";
import { ProcessRequest, ProcessResponse } from "../types/process";
import { Service } from "typedi";
import { formatString } from 'typescript-string-operations';
import { FeaturesService } from "./features-service";

@Service()
export default class ProcessService {
  constructor(private featuresService: FeaturesService) { }

  public executeProcess(config: ProcessRequest): Promise<ProcessResponse> {
    if (config.sysProcessName) {
      return this.runProcess(config);
    } else {
      return this.executeProcessById(config);
    }
  }

  public async executeProcessById(config: ProcessRequest): Promise<ProcessResponse> {
    const process = await this.getProcessById(config.sysProcessId);

    if (process) {
      config.sysProcessName = process.$Name;
      return this.runProcess(config);
    } else {
      let resources = await requireAsync(['ProcessModuleUtilitiesResources']);
      return this.getProcessByIdNotFoundResponse(resources, config.sysProcessId);
    }
  }

  private runProcess(config: ProcessRequest): Promise<ProcessResponse> {
    if (this.canGetNextProcessStepsViaResponse()) {
      const options = this.getRunProcessOptions(config);
      //@ts-ignore
      return new Promise(resolve => window.Terrasoft.ProcessEngineUtilities.runProcess(
        options, resolve, this));
    } else {
      //@ts-ignore
      return new Promise(resolve => window.Terrasoft.ProcessModuleUtilities._runProcessOld(
        config.sysProcessName, config.parameters, response => resolve(response), this));
    }
  }

  private getRunProcessOptions(config: ProcessRequest) {
    return {
      schemaName: config.sysProcessName,
      //@ts-ignore
      parameterValues: window.Terrasoft.ProcessModuleUtilities._convertRequestParameters(config.parameters),
      resultParameterNames: config.resultParameters
    };
  }

  private async getProcessById(sysProcessId?: Guid | string): Promise<any> {
    //@ts-ignore
    const esq = window.Ext.create("Terrasoft.EntitySchemaQuery", {
      rootSchemaName: "VwSysProcess",
      rowCount: 1
    });
    esq.addColumn("Name");
    esq.enablePrimaryColumnFilter(sysProcessId);
    return await esq.queryFirstAsync();
  }

  private getProcessByIdNotFoundResponse(resources: Resources, sysProcessId?: Guid | string): ProcessResponse {
    return {
      errorInfo: {
        message: formatString(
          resources.localizableStrings.ProcessSchemaNotFound,
          sysProcessId)
      },
      success: false
    };
  }

  private canGetNextProcessStepsViaResponse(): boolean {
    return this.featuresService.isEnabled('GetProcessStepsViaResponse');
  }
}
