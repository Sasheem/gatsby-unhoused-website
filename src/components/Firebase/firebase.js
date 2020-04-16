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

  // [START create payment intent]
  createPaymentIntent({ amount, email, name }) {
    const createPaymentIntentCallable = this.functions.httpsCallable(
      'createPaymentIntent'
    );
    return createPaymentIntentCallable({
      amount,
      email,
      name,
    });
  }
  // [END create payment intent]

  // [START auth create payment intent]
  createAuthPaymentIntent({ amount, email, name, username }) {
    const createAuthPaymentIntentCallable = this.functions.httpsCallable(
      'createAuthPaymentIntent'
    );
    return createAuthPaymentIntentCallable({
      amount,
      email,
      name,
      username,
    });
  }
  // [END auth create payment intent]

  // [START create a donation object]
  createDonation({
    amount,
    clientId,
    clientSecretStripe,
    donorEmail,
    message,
    username,
  }) {
    const createDonationCallable = this.functions.httpsCallable(
      'createDonation'
    );
    console.log(`firebase.js - createDonation running ${amount}:${clientId}`);
    return createDonationCallable({
      amount,
      clientId,
      clientSecretStripe,
      donorEmail,
      message,
      username,
    });
  }
  // [END create a donation object]

  // [START write user settings]
  writeUserSettings({ username, settings, profilePicture }) {
    const writeUserSettingsCallable = this.functions.httpsCallable(
      'writeToUserSettings'
    );
    return writeUserSettingsCallable({
      username,
      settings,
      profilePicture,
    });
  }
  // [END write user settings]

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

  async getClient({ clientId }) {
    return await this.db
      .collection('clients')
      .doc(clientId)
      .get();
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

  async getUser({ userId }) {
    return await this.db
      .collection('publicProfiles')
      .doc(userId)
      .get();
  }

  // creates a new user doc with id set to username
  // creates public profile using cloud functions in backend
  async register({ username, email, password, name }) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    const createProfileCallable = this.functions.httpsCallable(
      'createPublicProfile'
    );

    return createProfileCallable({
      username,
      email,
      name,
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
