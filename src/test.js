import firebase from 'firebase/app';

import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('zCd54c8FL0qNCXKGTFrL').collection('cartItems').doc('gNPa07g5JjmSYkUxcxAa');

firebase.doc('users/zCd54c8FL0qNCXKGTFrL/cartItems/gNPa07g5JjmSYkUxcxAa');

firestore.collection('users/zCd54c8FL0qNCXKGTFrL/cartItems');