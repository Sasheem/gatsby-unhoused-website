import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../components/Firebase';

const AddDonor = () => {
  const { firebase } = useContext(FirebaseContext);
  const [clients, setClients] = useState([]);
  // applying this form of useEffect ensures
  // it only runs once when the component mounts
  // useEffect(() => {}, []);
  useEffect(() => {
    // query all available clients
    if (firebase) {
      firebase.getClients().then(snapshot => {
        const availableClients = [];
        snapshot.forEach(doc => {
          availableClients.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setClients(availableClients);
      });
    }
    // useEffect will rerun when 'firebase' changes
    // thus being true when above if stmt runs
  }, [firebase]);
  console.log(clients);
  return <div />;
};

export default AddDonor;
