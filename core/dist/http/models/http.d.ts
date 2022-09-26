export declare enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export declare const getDefaultHttpHeaders: () => HeadersInit;
export declare namespace HttpStatusCode {
    enum Information {
        Continue = 100
    }
    enum Successful {
        OK = 200,
        Created = 201,
        Accepted = 202,
        NonAuthoritativeInformation = 203,
        NoContent = 204
    }
    enum Redirection {
        MultipleChoice = 300,
        MovedPermanently = 301,
        MovedTemporarily = 307
    }
    enum ClientError {
        BadRequest = 400,
        Unauthorized = 401,
        Forbidden = 403,
        NotFound = 404,
        MethodNotAllowed = 405,
        UnprocessableEntity = 422
    }
    enum ServerError {
        InternalServerError = 500,
        ServiceUnavailable = 503
    }
}
