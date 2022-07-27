import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';


export async function writeMessage(id: any,folder, obj: any) {
  // console.log(`/${id}/${user}`);
  await database()
    .ref(`/${id}/${folder}`)
    .set(obj)
    .then(() => console.log('Data set.'));
}
export async function readRealMessage(id: any,folder:any) {
  return new Promise(async (resolve, reject) => {

  let data: any[] = [];

  // console.log(`/${id}/${user}`);
  await database()
    .ref(`/${id}/${folder}`)
    .on('value', snapshot => {
      console.log('User data: ', snapshot.val());
      if(snapshot.val()!=null){
        data.push(snapshot.val());
      }
    })
  resolve(data)
  })
}
export async function getAllOfCollection(collection: any) {
  let data: any[] = [];
  let querySnapshot = await firestore().collection(collection).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      // console.log("DOCCC",{...doc?.data(),id:doc?.ref?.id});
      // let n={...doc?.data(),id:doc?.ref?.id}
      data.push({ ...doc?.data(), id: doc?.ref?.id });
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function getAllOfNestedCollection(collection: any,doc,collection1) {
  let data: any[] = [];
  let querySnapshot = await firestore().collection(collection).doc(doc).collection(collection1).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      // console.log("DOCCC",{...doc?.data(),id:doc?.ref?.id});
      // let n={...doc?.data(),id:doc?.ref?.id}
      data.push({ ...doc?.data(), id: doc?.ref?.id });
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function filterCollection(collection: any,value,value1,key1,key2) {
  try {
    let data: any[] = [];
    let querySnapshot = await firestore().collection(collection).where(`${key1}`,'==',value).where(`${key2}`,'==',value1).get();
    querySnapshot.forEach(function (doc) {
        data.push({ ...doc?.data(), id: doc?.ref?.id });
    });
    console.log('querySnapshot:',data);
    
    return data;
  } catch (error) {
    throw new Error(error);
  }
 
}
export async function filterCollectionTriple(collection: any,value,value1,value2,key1,key2,key3) {
  try {
    let data: any[] = [];
    let querySnapshot = await firestore().collection(collection).where(`${key1}`,'==',value).where(`${key2}`,'==',value1).where(`${key3}`,'==',value2).get();
    querySnapshot.forEach(function (doc) {
        data.push({ ...doc?.data(), id: doc?.ref?.id });
    });
    console.log('querySnapshot:',data);
    
    return data;
  } catch (error) {
    throw new Error(error);
  }
 
}
export async function filterCollectionSingle(collection: any,value,key) {
  try {
    let data: any[] = [];
    let querySnapshot = await firestore().collection(collection).where(`${key}`,'==',value).get();
    querySnapshot.forEach(function (doc) {
        data.push({ ...doc?.data(), id: doc?.ref?.id });
    });
    console.log('querySnapshot:',data);
    
    return data;
  } catch (error) {
    throw new Error(error);
  }
 
}
export function getData(collection: any, doc: any, objectKey?: any) {
  if (!objectKey) {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log(doc);

          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then((doc: any) => {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export async function getDataCase(collection: any,) {
  let data: any[] = [];
  let querySnapshot = await firestore().collection(collection).get();
  querySnapshot.forEach(function (doc) {
    console.log(doc);

    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function saveData(collection: any, doc: any, jsonObject: any) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, { merge: true })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
  //console.log("Document successfully written!");
}
export async function saveNestedData(collection: any, doc: any,collection1, jsonObject: any) {
  await firestore()
    .collection(collection)
    .doc(doc).collection(collection1).doc()
    .set(jsonObject, { merge: true })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
  //console.log("Document successfully written!");
}
export async function getSpecialties(collection: any, doc: any) {
  // console.log('ayayay');
  let temp = [];
  return firestore()
    .collection(collection)
    .doc(doc)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        // console.log('mila');
        // console.log(doc.data());
        // temp=[doc.data().selected]
        return doc?.data()
      } else {
        return false;
      }
    });
  // return temp;
  // return data;
}
export async function getDonors() {
  await firestore().collection('Users').where('BloodDonar', '!=', true).get().then((users) => {
    console.log(users);

    return users;
  }).catch(() => {
    return null;
  })
}
export async function uploadImageToStorage(path, imageName) {
  console.log("Path and file", path, imageName);

  let reference = storage().ref(imageName);         // 2
  let task = reference.putFile(path);               // 3

  task.then((res) => {                                 // 4
    console.log('Image uploaded to the bucket!', res);
  }).catch((e) => console.log('uploading image error => ', e));
}
export async function uploadFile(file, fileName?,doc?) {
console.log("UPLOAAAAAAAAAD");

  return new Promise(async (resolve, reject) => {
    const now = new Date().getTime();
    if (fileName) {
      var storageRef = await storage()
        .ref()
        .child(`${doc}/${fileName}`);
    }
    else {
      var storageRef = await storage()
        .ref(now.toString());
    }
    storageRef.putFile(file).then(async (snapshot) => {
      // resolve(snapshot.ref.getDownloadURL());
      let url = await storage().ref(`${snapshot.metadata.fullPath}`).getDownloadURL();
      console.log('this is upload photo ', url)
      resolve(url);

    })
  })
}

export async function uploadMultiFile(Imgs, user) {

  return new Promise(async (resolve, reject) => {
    const allUri: any = []
  await Imgs.map(async (item) => {
    const now = new Date().getTime();
    if (item.fileName) {
      var storageRef = await storage()
        .ref()
        .child(`${user}/${item.fileName}`);
    }
    else {
      var storageRef = await storage()
        .ref(now.toString());
    }
    await storageRef.putFile(item.uri).then(async (snapshot) => {
      // resolve(snapshot.ref.getDownloadURL());
      let url: any = await storage().ref(`${snapshot.metadata.fullPath}`).getDownloadURL();
      console.log('this is upload photo ', url)
      allUri.push(url);
    })
  })
  // return allUri;
  // if(allUri.length==Imgs.length)
  resolve(allUri);
  })
}