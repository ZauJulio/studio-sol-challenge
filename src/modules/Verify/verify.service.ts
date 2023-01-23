import { ESPECIAL_CHARACTERS } from '@constants';
import { IRules } from '@interfaces';

import debug from 'debug';

const log: debug.IDebugger = debug('app:verify-middleware');

export const RULES: {
  [key: string]: (password: string, value: number) => boolean;
} = {
  minSize: (password: string, value: number) => password.length >= value,
  minUppercase: (password: string, value: number) =>
    (password.match(/[A-Z]/g) || []).length >= value,
  minLowercase: (password: string, value: number) =>
    (password.match(/[a-z]/g) || []).length >= value,
  minDigit: (password: string, value: number) =>
    (password.match(/[0-9]/g) || []).length >= value,
  minSpecialChars: (password: string, value: number) =>
    (password.match(ESPECIAL_CHARACTERS) || []).length >= value,
  noRepeted: (password: string) =>
    password.split('').every((char, index, array) => char !== array[index + 1]),
};

class VerifyService {
  async validate(props: { password: string; rules: IRules[] }) {
    const { password, rules } = props;

    const noMatch = rules.filter(
      (r) => !RULES[r.rule] || !RULES[r.rule](password, r.value),
    );

    if (noMatch.length === 0) {
      log('Valid password');
      return { verify: true, noMatch: [] };
    } else {
      log('Invalid password');
      return { verify: false, noMatch: noMatch.map((rule) => rule.rule) };
    }
  }
}

export default new VerifyService();
