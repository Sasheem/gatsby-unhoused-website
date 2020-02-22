/**
 * * Makes initial connections to firebase
 * * service, database, auth, etc
 */
import firebaseConfig from './config';
import axios from 'axios';

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  // appending get() at the end, ensures this is called once and not subscribing to
  // any changes in the database
  async getUserProfile({ userId }) {
    return this.db
      .collection('publicProfiles')
      .where('userId', '==', userId)
      .get();
  }

  // creates a new user doc with id set to username
  async register({ username, email, password }) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return this.db
      .collection('publicProfiles')
      .doc(username)
      .set({
        userId: newUser.user.uid,
      });
  }

  async login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  } else if (firebaseInstance) {
    return firebaseInstance;
  } else {
    return null;
  }
}

export default getFirebaseInstance;
