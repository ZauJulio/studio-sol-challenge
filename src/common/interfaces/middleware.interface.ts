import { NextFunction, Request, Response } from 'express';
import debug from 'debug';

export type MiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response | undefined>;

export type MiddlewareConstructorProps = { name: string };

export type MiddlewareConstructor<T> = new (
  props: MiddlewareConstructorProps,
) => T;

export type IMiddlewareFat<T> = T extends IMiddleware ? T : never;

export abstract class IMiddleware {
  [key: string]: MiddlewareHandler | debug.Debugger;

  log: debug.IDebugger;

  constructor(props: MiddlewareConstructorProps) {
    this.log = debug(`app:${props.name}-middleware`);
  }
}
