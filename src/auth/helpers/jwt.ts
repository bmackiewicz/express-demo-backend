import { Secret, sign } from 'jsonwebtoken';

const version: string = require('../../../../package.json').version; // tslint:disable-line

export interface IJwtToken {
    user: { username: string, role: string, type: string };
    aud: string | null;
    iss: string;
    iat?: number;
    exp?: number;
  }

function createToken(
  username: string,
  role: string,
): string {
  return sign(<IJwtToken>{
    user: { username, type: 'user', role },
    aud: '',
    iss: `api/${version}`,
  }, process.env.TOKEN_SECRET as Secret, {
    algorithm: 'HS256',
    expiresIn: '15min',
  });
}

export { createToken };