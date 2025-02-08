import { NextFunction, Request, Response } from 'express';
export interface ICheckDatasBodyRequestMiddlewares {
	valiadate(request: Request, response: Response, next: NextFunction): Promise<void>;
	validateId(request: Request, response: Response, next: NextFunction): Promise<void>;
}
