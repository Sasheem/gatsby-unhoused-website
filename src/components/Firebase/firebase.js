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

  resetClientsMetrics() {
    const resetClientsMetricsCallable = this.functions.httpsCallable(
      'resetClientsMetrics'
    );

    return resetClientsMetricsCallable();
  }

  async getClientsMetrics() {
    return await this.db
      .collection('metrics')
      .doc('clients')
      .get();
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

  // [START create a SetupIntent for user]
  createSetupIntent({ customerId, paymentMethodId }) {
    const createSetupIntentCallable = this.functions.httpsCallable(
      'createSetupIntent'
    );
    return createSetupIntentCallable({
      customerId,
      paymentMethodId,
    });
  }
  // [END create a SetupIntent for user]

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

  // [START fetch all payment intents]
  listPaymentIntents({ customerId }) {
    const listPaymentIntentsCallable = this.functions.httpsCallable(
      'listPaymentIntents'
    );
    return listPaymentIntentsCallable({ customerId });
  }
  // [END fetch all payment intents]

  // [START list user payment methods]
  listPaymentMethods({ customerId }) {
    const listPaymentMethodsCallable = this.functions.httpsCallable(
      'listPaymentMethods'
    );
    return listPaymentMethodsCallable({ customerId });
  }
  // [END list user payment methods]

  // [START create a donation object]
  createDonation({
    amount,
    clientId,
    paymentIntentId,
    donorEmail,
    message,
    username,
  }) {
    const createDonationCallable = this.functions.httpsCallable(
      'createDonation'
    );
    return createDonationCallable({
      amount,
      clientId,
      paymentIntentId,
      donorEmail,
      message,
      username,
    });
  }
  // [END create a donation object]

  // [START update client after a donation]
  updateClientWithUserDonation({ amount, fundedBy, clientId, raised }) {
    const updateClientWithUserDonationCallable = this.functions.httpsCallable(
      'updateClientWithUserDonation'
    );
    return updateClientWithUserDonationCallable({
      amount,
      fundedBy,
      clientId,
      raised,
    });
  }
  // [END update client after a donation]

  // [START update client after un-auth donation]
  updateClientWithGuestDonation({ amount, raised, clientId }) {
    const updateClientWithGuestDonationCallable = this.functions.httpsCallable(
      'updateClientWithGuestDonation'
    );
    return updateClientWithGuestDonationCallable({
      amount,
      raised,
      clientId,
    });
  }
  // [END update client after un-auth donation]

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

  // [START add email to mailchimp list]
  async subscribeEmailToLists({ email }) {
    const subscribeEmailToListsCallable = this.functions.httpsCallable(
      'subscribeEmailToLists'
    );
    console.log(`subscribeEmailToLists firebase: ${email}`);
    return await subscribeEmailToListsCallable({ email });
  }
  // [END add email to mailchimp list]

  checkListForEmail({ email }) {
    const checkListForEmailCallable = this.functions.httpsCallable(
      'checkListForEmail'
    );
    console.log(`checkLisrForEmail firebase ${email}`);
    return checkListForEmailCallable({ email });
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
    const storyRef = this.db.collection('clients').doc(storyId);
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
