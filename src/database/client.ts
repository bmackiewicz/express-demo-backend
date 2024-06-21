// import Datastore = require('@google-cloud/datastore');
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();

export async function save(kind: string, data: any) {

  // The Cloud Datastore key for the new entity
  const taskKey = datastore.key(kind);

  // Prepares the new entity
  const task = {
    key: taskKey,
    data: data,
  };
console.log(task)
  // Saves the entity
  const result = await datastore.save(task);
  console.log(`Saved ${result}`);
}
