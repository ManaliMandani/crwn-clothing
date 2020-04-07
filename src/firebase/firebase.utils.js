import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDlJff_7DSS7D8KS3BYNE4POd1yMt-kPnU",
    authDomain: "crwn-db-8eea6.firebaseapp.com",
    databaseURL: "https://crwn-db-8eea6.firebaseio.com",
    projectId: "crwn-db-8eea6",
    storageBucket: "crwn-db-8eea6.appspot.com",
    messagingSenderId: "535681490467",
    appId: "1:535681490467:web:b6114ab900fa8c06f59b96",
    measurementId: "G-47EXXZG174"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const {displayName, email} = userAuth;

      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error){
          console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

      const batch = firestore.batch();
      objectsToAdd.forEach(obj=> {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
      });

      return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items} = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };

 
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;