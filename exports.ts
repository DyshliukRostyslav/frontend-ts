import Container from "typedi";
import HttpClient from "./http/http-client";
import { FeaturesService } from "./services/features-service";
import ProcessService from "./services/process-service";
import { RightsService } from "./services/rights-service";
import { SysSettingsService } from "./services/sys-settings-service";
import { SchemaOperationRightLevel } from "./types/rights";
import { getDisabledAlwaysRule, getRequiredAlwaysRule } from "./rules/business-rules";

export const getCoreExports = () => {
  return {
    http: {
      client: Container.get(HttpClient)
    },
    services: {
      sysSettingsService: Container.get(SysSettingsService),
      rightsService: Container.get(RightsService),
      featuresService: Container.get(FeaturesService),
      processService: Container.get(ProcessService)
    },
    models: {
      rights: {
        SchemaOperationRightLevel
      }
    },
    rules: {
      getRequiredAlwaysRule: getRequiredAlwaysRule,
      getDisabledAlwaysRule: getDisabledAlwaysRule
    }
  };
}
