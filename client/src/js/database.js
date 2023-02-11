import { openDB } from "idb";
//This is the file to configure indexedDB, which is a key stor database that identifies and organizes caches, a cache index so to speak-- 'idb' is a wrapper for the functionality of this database, which provides easy-to-use methods
const initdb = async () =>
  // We are creating a new database named 'jate' which will be veriosn 1
  openDB("jate", 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Put to the database");
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  // Use the .put() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
  //send error if putDb does not work
  //console.error("putDb not implemented");
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  // Use the .get() method to get all data in the database.
  const request = store.get(1);
  // Get confirmation of the request.
  const result = await request;

  console.log("result.value", result.value);
  return result.value;
};

initdb();
