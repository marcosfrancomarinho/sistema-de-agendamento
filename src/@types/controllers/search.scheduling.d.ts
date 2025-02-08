import { Response, Request, NextFunction } from 'express';

export interface ISearchSchedulingAdapterControllers {
	execute(request: Request, response: Response, next: NextFunction): Promise<void>;
}
