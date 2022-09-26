import { post } from './http/http';
import { DataValueType, isDateDataValueType, isLookupDataValueType } from './types/data-value-types';
import { SharedResponse } from './http/models/shared';

interface SysSettingsResponse {
  value?: any
  displayValue?: string
  isCacheable: boolean
  dataValueType: DataValueType
}

const settingsCache = {};

const mapSysSettingResponseValue = (response: SysSettingsResponse): any => {
  if (response.value === null || response.value === undefined) {
    return null;
  }

  if (isDateDataValueType(response.dataValueType)) {
    return window.Terrasoft.parseDate(response.value);
  } else if (isLookupDataValueType(response.dataValueType)) {
    return {
      value: response.value,
      displayValue: response.displayValue
    };
  }

  return response.value;
};

const querySysSettings = async(codes: Array<string>): Promise<SharedResponse> => {
  const response = await post('DataService/json/SyncReply/QuerySysSettings', {
    sysSettingsNameCollection: codes
  }, {
    isAbsolute: true
  });

  return response;
};

const processCachedSettings = (codes: Array<string>, resultSettings: any): Array<string> => {
  const settingsToQuery: Array<string> = [];

  codes.forEach(code => {
    if (settingsCache.hasOwnProperty(code)) {
      resultSettings[code] = settingsCache[code];
    } else {
      settingsToQuery.push(code);
    }
  });

  return settingsToQuery;
};

export const getSysSettings = async(codes: Array<string>): Promise<any> => {
  const resultSettings = {};

  const codesToQuery = processCachedSettings(codes, resultSettings);
  const settingsResponse = await querySysSettings(codesToQuery);

  for (const property in settingsResponse.data.values) {
    const setting = settingsResponse.data.values[property] as SysSettingsResponse;
    const value = mapSysSettingResponseValue(setting);

    if (setting.isCacheable) {
      settingsCache[property] = value;
    } else {
      delete settingsCache[property];
    }

    resultSettings[property] = value;
  }

  return resultSettings;
};

export const getSysSetting = async <TResult>(code: string): Promise<TResult> => {
  const sysSettings = await getSysSettings([code]);
  return sysSettings[code] as TResult;
};
