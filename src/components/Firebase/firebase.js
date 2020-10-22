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

  writeToAuth({ firstName, lastName, email }) {
    const writeToAuthCallable = this.functions.httpsCallable('writeToAuth');

    return writeToAuthCallable({ firstName, lastName, email });
  }

  updateAuthUserPassword({ password }) {
    const updateAuthUserPasswordCallable = this.functions.httpsCallable(
      'updateAuthUserPassword'
    );

    return updateAuthUserPasswordCallable({ password });
  }

  sendPasswordReset({ email }) {
    const sendPasswordResetCallable = this.functions.httpsCallable(
      'sendPasswordReset'
    );

    return sendPasswordResetCallable({ email });
  }

  getProfileDownloadURL({ username }) {
    return this.storage.ref(`users/${username}.jpeg`).getDownloadURL();
  }

  uploadUserProfileImage({ fileObject, username }) {
    const filename = `users/${username}.jpeg`;
    const file = this.storage.ref(filename);
    try {
      const result = file.put(fileObject);
      console.log(`result ${typeof result}`);
      console.dir(result);
      return result;
    } catch (error) {
      console.log(`uploadUserProfileImage error: ${error.message}`);
    }
    // file
    //   .put(fileObject)
    //   .then(result => {
    //     return result;
    //   })
    //   .catch(error => {
    //     console.log(`error: ${error.message}`);
    //   });
  }

  uploadVolunteerResume({ name, fileObject, volunteerId }) {
    const nameSplit = name.split('.');
    const filename = `volunteers/${volunteerId}.${nameSplit[1]}`;
    const file = this.storage.ref(filename);
    try {
      const result = file.put(fileObject);
      return result;
    } catch (error) {
      console.log(`uploadResume error ./firebase.js => ${error.message}`);
    }
  }

  uploadClientImage({ fileObject, clientId }) {
    const filename = `clients/${clientId}.jpeg`;
    const file = this.storage.ref(filename);

    try {
      const result = file.put(fileObject);
      return result;
    } catch (error) {
      console.log(`uploadClientImage error: ${error.message}`);
    }
  }

  uploadPartnerImage({ fileObject, name }) {
    const filename = `partners/${name.replace(/ /g, '-')}.png`;
    const file = this.storage.ref(filename);
    console.log(`filename: ${filename}`);
    try {
      const result = file.put(fileObject);
      return result;
    } catch (error) {
      console.log(`uploadPartnerImage error: ${error.message}`);
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

  // [START confirm a payment intent]
  confirmPaymentIntent({ intentId, paymentMethodId, isSavingCard }) {
    const confirmPaymentIntentCallable = this.functions.httpsCallable(
      'confirmPaymentIntent'
    );

    return confirmPaymentIntentCallable({
      intentId,
      paymentMethodId,
      isSavingCard,
    });
  }
  // [END confirm a payment intent]

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

  // [START save card info to user private profile]
  saveSetupIntent({ username, cards }) {
    const saveSetupIntentCallable = this.functions.httpsCallable(
      'saveSetupIntent'
    );

    return saveSetupIntentCallable({
      username,
      cards,
    });
  }
  // [END save card info to user private profile]

  // [START auth create payment intent]
  createAuthPaymentIntent({ amount, customer, email, paymentMethodId }) {
    const createAuthPaymentIntentCallable = this.functions.httpsCallable(
      'createAuthPaymentIntent'
    );
    return createAuthPaymentIntentCallable({
      amount,
      customer,
      email,
      paymentMethodId,
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

  // [START detach payment method from stripe]
  detachPaymentMethod({ id }) {
    const detachPaymentMethodCallable = this.functions.httpsCallable(
      'detachPaymentMethod'
    );
    return detachPaymentMethodCallable({ id });
  }
  // [END detach payment method from stripe]

  // [START ]
  deletePaymentMethod({ clientSecret, cards, username }) {
    const deletePaymentMethodCallable = this.functions.httpsCallable(
      'deletePaymentMethod'
    );
    return deletePaymentMethodCallable({ clientSecret, cards, username });
  }
  // [END ]

  // [START create a donation object]
  createDonation({
    amount,
    clientId,
    paymentIntentId,
    donorEmail,
    message,
    username,
    familySize,
    segmentId,
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
      familySize,
      segmentId,
    });
  }
  // [END create a donation object]

  // [START update client after a donation]
  updateClientWithUserDonation({
    amount,
    fundedBy,
    clientId,
    raised,
    paymentIntentId,
    donorEmail,
    message,
    username,
    familySize,
    segmentId,
  }) {
    const updateClientWithUserDonationCallable = this.functions.httpsCallable(
      'updateClientWithUserDonation'
    );
    return updateClientWithUserDonationCallable({
      amount,
      fundedBy,
      clientId,
      raised,
      paymentIntentId,
      donorEmail,
      message,
      username,
      familySize,
      segmentId,
    });
  }
  // [END update client after a donation]

  // [START update client after un-auth donation]
  updateClientWithGuestDonation({
    amount,
    raised,
    clientId,
    paymentIntentId,
    donorEmail,
    message,
    familySize,
    segmentId,
  }) {
    const updateClientWithGuestDonationCallable = this.functions.httpsCallable(
      'updateClientWithGuestDonation'
    );
    return updateClientWithGuestDonationCallable({
      amount,
      raised,
      clientId,
      paymentIntentId,
      donorEmail,
      message,
      familySize,
      segmentId,
    });
  }
  // [END update client after un-auth donation]

  // [START update client from admin]
  updateClientFromAdmin({ clientId, updateObject }) {
    const updateClientFromAdminCallable = this.functions.httpsCallable(
      'updateClientFromAdmin'
    );

    return updateClientFromAdminCallable({
      clientId,
      updateObject,
    });
  }
  // [END update client from admin]

  // [START update partner from admin]
  updatePartnerFromAdmin({ partnerId, updateObject }) {
    const updatePartnerFromAdminCallable = this.functions.httpsCallable(
      'updatePartnerFromAdmin'
    );

    return updatePartnerFromAdminCallable({
      partnerId,
      updateObject,
    });
  }
  // [END update partner from admin]

  // [START write user settings]
  writeUserSettings({ username, settings, imagePath }) {
    const writeUserSettingsCallable = this.functions.httpsCallable(
      'writeToUserSettings'
    );
    // console.log(`START settings:`);
    // console.dir(settings);
    // if (imagePath !== '') {
    //   const imageUrl = this.storage.ref(imagePath).getDownloadURL();
    //   settings = { ...settings, imageUrl };
    // }
    // console.log(`END settings:`);
    // console.dir(settings);
    return writeUserSettingsCallable({
      username,
      settings,
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

  // [START delete client from database]
  deleteClient({ clientId }) {
    const deleteClientCallable = this.functions.httpsCallable('deleteClient');
    const filename = `clients/${clientId}.jpeg`;
    const file = this.storage.ref(filename);
    try {
      const result = file.delete();
      console.log(`result ${typeof result}`);
      console.dir(result);
      return deleteClientCallable({ clientId });
    } catch (error) {
      console.log(`uploadUserProfileImage error: ${error.message}`);
    }
  }
  // [END delete client from database]

  // add a client with cloud functions
  async createClient({
    firstName,
    lastName,
    situation,
    status,
    goal,
    raised,
    familySize,
    questions,
    answers,
    dateFundingBegan,
    dateHoused,
    imagePath,
  }) {
    const imageUrl = await this.storage.ref(imagePath).getDownloadURL();
    const createClientCallable = this.functions.httpsCallable('createClient');
    return createClientCallable({
      firstName,
      lastName,
      situation,
      imageUrl,
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

  // [START create message from general contact form]
  createMessage({ name, email, message, subject }) {
    const createMessageCallable = this.functions.httpsCallable('createMessage');
    return createMessageCallable({
      name,
      email,
      message,
      subject,
    });
  }
  // [END create message from general contact form]

  // [START create a message from request help form]
  createHelpMessage({ emailValues }) {
    const createHelpMessageCallable = this.functions.httpsCallable(
      'createHelpMessage'
    );
    return createHelpMessageCallable({ emailValues });
  }
  // [END create a message from request help form]

  // [START create a message from volunteer form]
  async createVolunteerMessage({ emailValues, filePath }) {
    const createVolunteerMessageCallable = this.functions.httpsCallable(
      'createVolunteerMessage'
    );
    const fileUrl = await this.storage.ref(filePath).getDownloadURL();

    return createVolunteerMessageCallable({ emailValues, fileUrl });
  }
  // [END create a message from volunteer form]

  // [START get all partners]
  async getPartners() {
    return await this.db.collection('partners').get();
  }
  // [END get all partners]

  // [START create a message from case worker form]
  async createCaseworkerMessage({
    name,
    agencyName,
    email,
    phone,
    clientName,
    clientEmail,
    message,
    subject,
  }) {
    const createCaseworkerMessageCallable = this.functions.httpsCallable(
      'createCaseworkerMessage'
    );

    return createCaseworkerMessageCallable({
      name,
      agencyName,
      email,
      phone,
      clientName,
      clientEmail,
      message,
      subject,
    });
  }
  // [END create a message from case worker form]

  // [START delete partner from database]
  deletePartner({ partnerId }) {
    const deletePartnerCallable = this.functions.httpsCallable('deletePartner');
    const filename = `partners/${partnerId}.png`;
    const file = this.storage.ref(filename);
    try {
      const result = file.delete();
      console.log(`result ${typeof result}`);
      console.dir(result);
      return deletePartnerCallable({ partnerId });
    } catch (error) {
      console.log(`uploadUserProfileImage error: ${error.message}`);
    }
  }
  // [END delete partner from database]

  // [START create a partner object]
  async createPartner({ name, email, website, imagePath }) {
    const imageUrl = await this.storage.ref(imagePath).getDownloadURL();
    const createPartnerCallable = this.functions.httpsCallable('createPartner');

    return createPartnerCallable({
      id: name.replace(/ /g, '-'),
      name,
      email,
      website,
      imageUrl,
    });
  }
  // [END create a partner object]

  // [START subscribe guest to mailchimp list]
  async subscribeGuestToList({ email, name }) {
    const subscribeGuestToListCallable = this.functions.httpsCallable(
      'subscribeGuestToList'
    );

    return await subscribeGuestToListCallable({ email, name });
  }
  // [END subscribe guest to mailchimp list]

  // [START add email to mailchimp list]
  async subscribeEmailToList({ email }) {
    const subscribeEmailToListCallable = this.functions.httpsCallable(
      'subscribeEmailToList'
    );

    return await subscribeEmailToListCallable({ email });
  }
  // [END add email to mailchimp list]

  checkListForEmail({ email }) {
    const checkListForEmailCallable = this.functions.httpsCallable(
      'checkListForEmail'
    );
    console.log(`checkListForEmail firebase ${email}`);
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

  // [START get success clients ordered by date housed]
  subscribeToSuccessClients({ onSnapshot }) {
    return this.db
      .collection('clients')
      .where('status', '==', 'Housed')
      .orderBy('dateHoused', 'desc')
      .onSnapshot(onSnapshot);
  }
  // [END get success clients ordered by date housed]

  // [START get all clients ordered by dateFundingBegan]
  subscribeToAllClients({ onSnapshot }) {
    return this.db
      .collection('clients')
      .orderBy('dateFundingBegan', 'desc')
      .onSnapshot(onSnapshot);
  }
  // [END get all clients ordered by dateFundingBegan]

  // [START get funding clients real time]
  subscribeToFundingClients({ onSnapshot }) {
    return this.db
      .collection('clients')
      .where('status', '==', 'Funding')
      .orderBy('dateFundingBegan', 'desc')
      .onSnapshot(onSnapshot);
  }
  // [END get funding clients real time]

  // [START get clients recently housed in real time]
  subscribeToClientsRecentlyHoused({ onSnapshot }) {
    return this.db
      .collection('clients')
      .where('status', '==', 'Housed')
      .orderBy('dateHoused', 'desc')
      .limit(6)
      .onSnapshot(onSnapshot);
  }
  // [END get clients recently housed in real time]

  // [START get all partners]
  subscribeToAllPartners({ onSnapshot }) {
    return this.db.collection('partners').onSnapshot(onSnapshot);
  }
  // [END get all partners]

  // [START get user info in real time]
  subscribeToUserInfo({ username, onSnapshot }) {
    return this.db
      .collection('publicProfiles')
      .doc(username)
      .onSnapshot(onSnapshot);
  }
  // [END get user info in real time]

  // [START get client metrics real time]
  subscribeToClientsMetrics({ onSnapshot }) {
    return this.db
      .collection('metrics')
      .doc('clients')
      .onSnapshot(onSnapshot);
  }
  // [END get client metrics real time]

  // [START get partners real time]
  subscribeToPartnersMetrics({ onSnapshot }) {
    return this.db.collection('partners').onSnapshot(onSnapshot);
  }
  // [END get partners real time]

  // [START get donations real time for a user]
  subscribeToDonations({ username, onSnapshot }) {
    return this.db
      .collection('donations')
      .where('donor', '==', username)
      .onSnapshot(onSnapshot);
  }
  // [END get donations real time for a user]

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

  // [START delete a user]
  async deleteUser({ username, customerId, email }) {
    const deleteUserCallable = this.functions.httpsCallable('deleteUser');
    return deleteUserCallable({ username, customerId, email });
  }
  // [END delete a user]

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
