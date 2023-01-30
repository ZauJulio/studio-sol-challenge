import { NextFunction, Request, Response } from 'express';
import debug from 'debug';

export type ControllerHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response>;

export type ControllerConstructor<T> = new (
  props: ControllerConstructorProps,
) => T;

export type ControllerConstructorProps = { service: any; name: string };

export type IControllerFat<U> = U extends IController ? U : never;

export abstract class IController {
  [key: string]:
    | ControllerHandler
    | ControllerConstructor<IController>
    | debug.Debugger;

  log: debug.IDebugger;
  service: any;

  constructor(props: ControllerConstructorProps) {
    this.log = debug(`app:${props.name}-middleware`);
    this.service = props.service;
  }
}
