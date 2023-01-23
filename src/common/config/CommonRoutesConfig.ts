import { ICommonRoutesConfig } from '@interfaces';

export abstract class CommonRoutesConfig {
  app: ICommonRoutesConfig['app'];
  name: string;
  server?: ICommonRoutesConfig['server'];

  constructor(props: ICommonRoutesConfig & { name: string }) {
    this.app = props.app;
    this.server = props.server;
    this.name = props.name;

    this.configureRoutes();
  }

  getName() {
    return this.name;
  }

  abstract configureRoutes(): Promise<ICommonRoutesConfig['app']>;
}
