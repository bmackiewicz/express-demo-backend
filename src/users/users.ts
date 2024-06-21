import { save } from '../database/client';
import bcrypt from 'bcrypt'
import { createToken } from '../auth/helpers/jwt';

const {Datastore, PropertyFilter, and} = require('@google-cloud/datastore');

export interface User {
  username: string,
  firstName: string,
  lastName: string,
  password: string
}

export const createUser = async (data: User) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  // The kind for the new entity
  const kind = 'Users';
  data.password = hashedPassword;

  await save(kind, data)


}
export const checkUser = async (data: { password: string, username: string }) => {
  // The kind for the new entity
  const kind = 'Users';

  const datastore = new Datastore();
  console.log(data.username, data.password)
  const query = datastore
    .createQuery(kind)
    .filter(
      and([
        new PropertyFilter('username', '=', data.username),
      ])
    );

  const [entities] = await datastore.runQuery(query);
  console.log(`entities ${entities}`);

  if ([entities].length) {
    for (const entity of entities) {
      const isMatch = await bcrypt.compare(data.password, entity.password);
      if (!isMatch) {
       return null
      }
      return createToken(data.username, '')
    }

  }
  return null

}

