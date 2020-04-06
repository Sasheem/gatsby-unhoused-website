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

  // create donation with cloud functions
  async createDonationRecord({
    firstName,
    lastName,
    // email,
    clientId,
    donation,
    message,
  }) {
    const createDonationRecordCallable = this.functions.httpsCallable(
      'createDonationRecord'
    );
    return createDonationRecordCallable({
      firstName,
      lastName,
      // email,
      clientId,
      donation,
      message,
    });
  }

  // get all clients with cloud functions
  async getClients() {
    // we aren't making an https backend request for clients because
    // the rules set in firebase say we can read clients in the front end
    return await this.db.collection('clients').get();
  }

  // get all clients from 'clientsFeatured' collection
  // will remove later b/c I want to filter my 'clients' collection
  // for the Unhoused status in the front end.
  async getFeaturedClients() {
    return this.db.collection('clientsFeatured').get();
  }

  // add a client with cloud functions
  async createClient({
    firstName,
    lastName,
    situation,
    clientImage,
    status,
    goal,
    raised,
    familySize,
    questions,
    answers,
    dateFundingBegan,
    dateHoused,
  }) {
    const createClientCallable = this.functions.httpsCallable('createClient');
    return createClientCallable({
      firstName,
      lastName,
      situation,
      clientImage,
      status,
      goal,
      raised,
      familySize,
      questions,
      answers,
      dateFundingBegan,
      dateHoused,
    });
  }

  // post comment with cloud functions
  async postComment({ text, clientId }) {
    // create reference to function we want to use
    const postCommentCallable = this.functions.httpsCallable('postComment');

    return postCommentCallable({
      text,
      clientId,
    });
  }

  // dynamically query for comments
  // second argument is a callback function, using same naming
  // convention as firebase
  subscribeToStoryComments({ storyId, onSnapshot }) {
    const storyRef = this.db.collection('clientsFeatured').doc(storyId);
    return this.db
      .collection('comments')
      .where('client', '==', storyRef)
      .orderBy('dateCreated', 'desc')
      .onSnapshot(onSnapshot);
  }

  // appending get() at the end, ensures this is called once and not subscribing to
  // any changes in the database
  getUserProfile({ userId, onSnapshot }) {
    return this.db
      .collection('publicProfiles')
      .where('userId', '==', userId)
      .limit(1)
      .onSnapshot(onSnapshot);
  }

  // creates a new user doc with id set to username
  // creates public profile using cloud functions in backend
  async register({ username, email, password }) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    const createProfileCallable = this.functions.httpsCallable(
      'createPublicProfile'
    );

    return createProfileCallable({
      username,
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
