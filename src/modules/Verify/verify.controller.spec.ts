/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect, vi } from 'vitest';

import { VerifyController } from './verify.controller';
import { IService } from '@interfaces';

const controller = new VerifyController({
  name: 'verify-mock',
  service: {
    validate: () => ({ verify: true, noMatch: [] }),
    log: {} as any,
  } as IService,
});

describe('VerifyController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a validate method', () => {
    expect(controller.verify).toBeDefined();
  });

  it('should call the service validate method', () => {
    const spy = vi.spyOn(controller.service, 'validate');

    const res = {
      status: () => ({
        json: () => {},
        send: () => {},
      }),
    };

    controller.verify(
      { body: { password: '123', rules: [] } } as any,
      res as any,
    );

    expect(spy).toHaveBeenCalled();
  });
});
