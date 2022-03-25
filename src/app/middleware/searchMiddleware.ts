import RequestWithUser from "../util/rest/request";
import URLParams from "../util/rest/urlparams";
import { NextFunction, Response } from "express";
import { Validator } from "class-validator";
import { SortOrder } from "../util/constants/SortOrder";

/**
 * Middleware to be used to handle fetch multiple objects.
 * 1. Extracts params from query
 * 2. Sets default limit, offset, sort order
 * 3. Assigns the query params to searchParams object,
 * @param request
 * @param response
 * @param next
 */
const addSearchParams = (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    // const { q, limit, offset, from, to, sort } = request.query;
    const validator = new Validator();
    const params: URLParams = request.query;
    if (!params.limit) {
      params.limit = 25;
    }
    if (!params.offset) {
      params.offset = 0;
    }
    if (!validator.isEnum(params.order, SortOrder)) {
      params.order = SortOrder.DESC;
    }
    request.searchParams = params;
    next();
  } catch (error) {
    next();
  }
};

export default addSearchParams;
