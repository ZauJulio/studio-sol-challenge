import { NextFunction, Request, Response, Router } from 'express';
import { Server } from 'http';
import debug from 'debug';

import {
  IGraphql,
  IService,
  IControllerFat,
  IMiddlewareFat,
  ServiceConstructorProps,
  ControllerConstructorProps,
  MiddlewareConstructorProps,
} from '@interfaces';

export type ModuleHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response<any, Record<string, any>> | undefined>;

export type ModuleConstructorProps<T, U> = {
  name: string;
  server: Server;
  graphql: IGraphql;
  service: new (props: ServiceConstructorProps) => IService;
  middleware: new (props: MiddlewareConstructorProps) => IMiddlewareFat<T>;
  controller: new (props: ControllerConstructorProps) => IControllerFat<U>;
};

export abstract class IModule<T, U> {
  name: string;
  router: Router;
  server: Server;
  service: IService;
  middleware: IMiddlewareFat<T>;
  controller: IControllerFat<U>;
  graphql: IGraphql;

  log: debug.Debugger;

  constructor(props: ModuleConstructorProps<T, U>) {
    this.name = props.name;
    this.router = Router();

    this.service = new props.service({
      name: props.name,
    });

    this.middleware = new props.middleware({
      name: props.name,
    });

    this.controller = new props.controller({
      name: props.name,
      service: this.service,
    });

    this.graphql = props.graphql;

    if (props.server) this.server = props.server;

    this.log = debug(`app:${props.name}-module`);

    this.routes();
  }

  abstract routes(): Promise<void>;
}
