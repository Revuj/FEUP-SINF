import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyB_tsAsI9CJF-lS43hhanMZ7fo2hoxrlZw',
  authDomain: 'feup-sinf.firebaseapp.com',
  databaseURL: 'https://feup-sinf.firebaseio.com',
  projectId: 'feup-sinf',
  storageBucket: 'feup-sinf.appspot.com',
  messagingSenderId: '658863023926',
  appId: '1:658863023926:web:2f59b7e5f93ee474e0f597',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initializing Firebase services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp };
