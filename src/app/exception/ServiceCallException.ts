import HttpException from "./HttpException";
import { ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case an external service call fails.
 */
class ServiceCallException extends HttpException {
    constructor() {
        const errorDetail = ErrorCodes.SERVICE_ERROR;
        super(500, errorDetail.MESSAGE, errorDetail.CODE);
    }
}

export default ServiceCallException;
