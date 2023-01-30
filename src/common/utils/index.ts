import { Server } from 'http';

import { ESPECIAL_CHARACTERS } from '@constants';

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

export async function loadModules(server: Server) {
  return Object.values(await import('../../modules')).map((_module) =>
    _module(server),
  );
}
