import { describe, it, expect } from 'vitest';

import { _instance as VerifyService } from './verify.service';

describe('VerifyService', () => {
  it('should be defined', () => {
    expect(VerifyService).toBeDefined();
  });

  it('should have a validate method', () => {
    expect(VerifyService.validate).toBeDefined();
  });

  it('should return true when validating a valid password', () => {
    expect(
      VerifyService.validate({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minSpecialChars', value: 2 }],
      }),
    ).toEqual({
      verify: true,
      noMatch: [],
    });
  });

  it('should return false when validating an invalid password', () => {
    expect(
      VerifyService.validate({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minSpecialChars', value: 4 }],
      }),
    ).toEqual({
      verify: false,
      noMatch: ['minSpecialChars'],
    });
  });
});

describe('VerifyController:test all rules', () => {
  it('should return not valid when minSpecialChars is not met', () => {
    expect(
      VerifyService.validate({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minSpecialChars', value: 4 }],
      }),
    ).toEqual({
      verify: false,
      noMatch: ['minSpecialChars'],
    });
  });

  it('should return not valid when minDigit is not met', () => {
    expect(
      VerifyService.validate({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minDigit', value: 4 }],
      }),
    ).toEqual({
      verify: false,
      noMatch: ['minDigit'],
    });
  });

  it('should return not valid when minDigit is not met', () => {
    expect(
      VerifyService.validate({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minDigit', value: 4 }],
      }),
    ).toEqual({
      verify: false,
      noMatch: ['minDigit'],
    });
  });

  it('should return not valid when minSize is not met', () => {
    expect(
      VerifyService.validate({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minSize', value: 32 }],
      }),
    ).toEqual({
      verify: false,
      noMatch: ['minSize'],
    });
  });

  it('should return not valid when minUppercase is not met', () => {
    expect(
      VerifyService.validate({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minUppercase', value: 5 }],
      }),
    ).toEqual({
      verify: false,
      noMatch: ['minUppercase'],
    });
  });

  it('should return not valid when minLowercase is not met', () => {
    expect(
      VerifyService.validate({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minLowercase', value: 20 }],
      }),
    ).toEqual({
      verify: false,
      noMatch: ['minLowercase'],
    });
  });

  it('should return not valid when noRepeted is not met', () => {
    expect(
      VerifyService.validate({
        password: 'TesteSenhaaForte!123&',
        rules: [{ rule: 'noRepeted', value: 0 }],
      }),
    ).toEqual({
      verify: false,
      noMatch: ['noRepeted'],
    });
  });
});
