import { SharedResponse } from "./models/shared";
import { HttpStatusCode, HttpMethods, getDefaultHttpHeaders } from "./models/http";
import { UnknownObject } from "../types/unknown-object";
import { MaskHelper } from "../view-interactors/mask-helper";
import { Service } from "typedi";
import { RequestOptions } from "./models/request-options";
import { showModalBox } from "@el-sdk/ui/modal-box";

@Service()
export default class HttpClient {
  public constructor(private maskHelper: MaskHelper) { }

  public get(resource: string, request: UnknownObject = {}, options?: RequestOptions): Promise<SharedResponse> {
    const parameters = Object.getOwnPropertyNames(request)
      .map((x) => `${x}=${request[x]}`)
      .join("&");

    let resourceWithParams = resource;
    if (parameters) {
      resourceWithParams += `?${parameters}`;
    }

    return this.sendRequest(resourceWithParams, null, HttpMethods.GET, options);
  }

  public post(resource: string, request: UnknownObject = {}, options?: RequestOptions): Promise<SharedResponse> {
    return this.sendRequest(resource, request, HttpMethods.POST, options);
  }

  public put(resource: string, request: UnknownObject = {}, options?: RequestOptions): Promise<SharedResponse> {
    return this.sendRequest(resource, request, HttpMethods.PUT, options);
  }

  private async sendRequest(
    resource: string,
    request: UnknownObject | null,
    method: HttpMethods,
    options?: RequestOptions): Promise<SharedResponse> {
    this.startRequest(options);

    const body = request ? JSON.stringify(request) : null;
    const response = await fetch(HttpClient.getPath(resource), {
      method: method,
      headers: Object.assign(getDefaultHttpHeaders(), options?.headers ?? {}),
      body: body
    });

    return await this.handleResponse(response, options);
  }

  private async handleResponse(response: Response, options?: RequestOptions): Promise<SharedResponse> {
    if (response.status === HttpStatusCode.ServerError.InternalServerError ||
      response.status === HttpStatusCode.ClientError.BadRequest) {
      this.processInternalServerError(options);
    }

    this.finishRequest(options);

    const result = {
      success: response.ok,
      statusCode: response.status,
      headers: response.headers,
      data: null
    }

    if (result.statusCode !== HttpStatusCode.Successful.NoContent) {
      result.data = await response.json();
    }

    return result;
  }

  private startRequest(options?: RequestOptions): void {
    this.maskHelper.showBodyMask(options?.mask);
  }

  private finishRequest(options?: RequestOptions): void {
    this.maskHelper.hideBodyMask(options?.mask);
  }

  private processInternalServerError(options?: RequestOptions): void {
    this.maskHelper.hideBodyMask(options?.mask);
    showModalBox('An error occurred during request. Please, contact system administrator.');
  }

  private static getPath(resource: string): string {
    return `${window.Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl()}/api/${resource}`;
  }
}