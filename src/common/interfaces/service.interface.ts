import debug from 'debug';

export type ServiceHandler = (props: any) => Promise<any> | any;

export type ServiceConstructorProps = { name: string };

export type IServiceFat<T> = T extends IService ? T : never;

export abstract class IService {
  [key: string]: ServiceHandler | debug.Debugger;

  log: debug.IDebugger;

  constructor(props: ServiceConstructorProps) {
    this.log = debug(`app:${props.name}-service`);
  }
}
