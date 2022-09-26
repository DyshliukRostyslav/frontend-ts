import { emptyString } from 'typescript-string-operations';
import { getCookie } from './cookies';

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export const getDefaultHttpHeaders = (): HeadersInit => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  BPMCSRF: getCookie('BPMCSRF') ?? emptyString
});

export namespace HttpStatusCode {
  export enum Information {
    Continue = 100
  }

  export enum Successful {
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204
  }

  export enum Redirection {
    MultipleChoice = 300,
    MovedPermanently = 301,
    MovedTemporarily = 307
  }

  export enum ClientError {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    UnprocessableEntity = 422
  }

  export enum ServerError {
    InternalServerError = 500,
    ServiceUnavailable = 503
  }
}

