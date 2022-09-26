import { SharedResponse } from './models/shared';
import { HttpStatusCode, HttpMethods, getDefaultHttpHeaders } from './models/http';
import { UnknownObject } from '../types/unknown-object';
import { MaskHelper } from '../view-interactors/mask-helper';
import { RequestOptions } from './models/request-options';
import { showModalBox } from '../ui/modal-box';

const sendRequest = async(
  resource: string,
  request: UnknownObject | null,
  method: HttpMethods,
  options?: RequestOptions): Promise<SharedResponse> => {
  const maskHelper = new MaskHelper();
  maskHelper.showBodyMask(options?.mask);

  const body = request ? JSON.stringify(request) : null;
  const response = await fetch(getHttpResource(resource, options?.isAbsolute ?? false), {
    method: method,
    headers: Object.assign(getDefaultHttpHeaders(), options?.headers ?? {}),
    body: body
  });

  return await handleResponse(response, maskHelper, options);
};

const handleResponse = async(response: Response, maskHelper: MaskHelper, options?: RequestOptions): Promise<SharedResponse> => {
  if (response.status === HttpStatusCode.ServerError.InternalServerError ||
    response.status === HttpStatusCode.ClientError.BadRequest) {
    processInternalServerError(maskHelper, options);
  }

  maskHelper.hideBodyMask(options?.mask);

  const result = {
    success: response.ok,
    statusCode: response.status,
    headers: response.headers,
    data: null
  };

  if (result.statusCode !== HttpStatusCode.Successful.NoContent) {
    const responseText = await response.text();
    result.data = responseText ? JSON.parse(responseText) : responseText;
  }

  return result;
};

const getHttpResource = (resource: string, isAbsolute: boolean): string => {
  const baseUrl = getCreatioUrl();
  if (isAbsolute) {
    return `${baseUrl}/${resource}`;
  }

  return `${baseUrl}/api/${resource}`;
};

const processInternalServerError = (maskHelper: MaskHelper, options?: RequestOptions): void => {
  maskHelper.hideBodyMask(options?.mask);
  showModalBox('An error occurred during request. Please, contact system administrator.');
};

export const getCreatioUrl = () => window.Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();

export const get = async(resource: string, request: UnknownObject = {}, options?: RequestOptions): Promise<SharedResponse> => {
  const parameters = Object.getOwnPropertyNames(request)
    .map(x => `${x}=${request[x]}`)
    .join('&');

  let resourceWithParams = resource;
  if (parameters) {
    resourceWithParams += `?${parameters}`;
  }

  return sendRequest(resourceWithParams, null, HttpMethods.GET, options);
};

export const post = async(resource: string, request: UnknownObject = {}, options?: RequestOptions): Promise<SharedResponse> => sendRequest(resource, request, HttpMethods.POST, options);

export const put = async(resource: string, request: UnknownObject = {}, options?: RequestOptions): Promise<SharedResponse> => sendRequest(resource, request, HttpMethods.PUT, options);
