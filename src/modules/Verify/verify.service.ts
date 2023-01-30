import { IService } from '@interfaces';
import { IRule } from '@types';
import { RULES } from '@utils';

export default class VerifyService extends IService {
  validate(props: { password: string; rules: IRule[] }) {
    const { password, rules } = props;

    const noMatch = rules.filter(
      (r) => !RULES[r.rule] || !RULES[r.rule](password, r.value),
    );

    if (noMatch.length === 0) {
      this.log('Valid password');
      return { verify: true, noMatch: [] };
    } else {
      this.log('Invalid password');
      return { verify: false, noMatch: noMatch.map((rule) => rule.rule) };
    }
  }
}

export const _instance = new VerifyService({
  name: 'verify',
});
