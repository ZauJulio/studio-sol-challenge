/* eslint-disable @typescript-eslint/no-empty-function */
import { Request, Response, NextFunction } from 'express';
import VerifyMiddleware from '../verify.middleware';

const handlers = new VerifyMiddleware({
  name: 'verify',
});

describe('VerifyMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      body: {
        password: 'TesteSenhaForte!123&',
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should be defined', () => {
    expect(handlers.validateBodyFields).toBeDefined();
  });

  it('should validate password field', async () => {
    await handlers.validateBodyFields(
      {
        body: {
          rules: [
            {
              rule: 'minDigit',
              value: 1,
            },
          ],
        },
      } as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      verify: false,
      noMatch: ['minDigit'],
    });
  });

  it('should validate rule field', async () => {
    await handlers.validateBodyFields(
      { body: { password: 'TesteSenhaForte!123&' } } as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      verify: true,
      noMatch: [],
    });
  });
});
