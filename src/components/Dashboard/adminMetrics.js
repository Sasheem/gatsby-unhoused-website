import React, { useContext, useState, useEffect } from 'react';

import { FirebaseContext } from '../Firebase';
import CardDashboardMetric from '../Cards/cardDashboardMetric';

import './dashboard.scss';

const AdminMetrics = () => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.subscribeToClientsMetrics({
      onSnapshot: snapshot => {
        console.log(`snapshot: ${typeof snapshot}`);
        console.dir(snapshot.data());
        setMetrics(snapshot.data());
      },
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleResetClients = () => {
    if (firebase) {
      setLoading(true);
      firebase
        .resetClientsMetrics()
        .then(result => {
          console.log(`handleResetClients: ${result}`);
          console.dir(result);
          setLoading(false);
        })
        .catch(error => {
          console.log(`error: ${error.message}`);
          setLoading(false);
        });
    }
  };
  return (
    <div className="dashboard-item">
      {user && !!user.isAdmin && metrics !== null && (
        <div className="dashboard-row">
          <CardDashboardMetric name="Total" value={metrics.total} />
          <CardDashboardMetric name="Housed" value={metrics.housed} />
          <CardDashboardMetric name="Unhoused" value={metrics.unhoused} />
        </div>
      )}
      <div className="admin-button" onClick={handleResetClients}>
        {loading ? 'Processing...' : 'Reset client metrics'}
      </div>
    </div>
  );
};

export default AdminMetrics;
