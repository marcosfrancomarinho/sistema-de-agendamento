import { NextFunction, Request, Response } from "express";
export interface ICheckDatasBodyRequestMiddleware {
	valiadate(request: Request, response: Response, next: NextFunction): Promise<void>;
}
