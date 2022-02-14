import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Get all from the database");
  const textDb = await openDB("jate", 1);
	const tx = textDb.transaction("jate", "readwrite");
	const store = tx.objectStore("jate");
  // const getObj = await store.getAll();
  // console.log(getObj);
  // const contentCheck = getObj.length > 0 ? {content : content, id: getObj[0].id} : {content : content};
	// const request = await store.put(contentCheck);
  const request = store.put({id:1,content:content})
	const result = await request;
	console.log("result.value", result);
  // console.error('putDb not implemented');
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get all from the database");
  const textDb = await openDB("jate", 1);
	const tx = textDb.transaction("jate", "readonly");
	const store = tx.objectStore("jate");
	const request = store.get(1);
	const result = await request;
	console.log("result.value", result);
  // console.error("getDb not implemented");
	return result;
}

initdb();
