import React, { useState, useContext, useEffect } from 'react';

import { FirebaseContext } from '../../Firebase';
import CardMetric from '../../Cards/cardMetric';

import './metrics.scss';

const Metrics = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [metrics, setMetrics] = useState(null);
  const [partners, setPartners] = useState(0);

  useEffect(() => {
    let partnerCount = 0;
    if (firebase) {
      // get partner count
      firebase
        .getPartners()
        .then(snapshot => {
          snapshot.forEach(doc => (partnerCount += 1));
          setPartners(partnerCount);
        })
        .catch(error => {
          console.log(`error getting partners: ${error.message}`);
        });

      // get clients metrics
      firebase
        .getClientsMetrics()
        .then(snapshot => {
          setMetrics(snapshot.data());
        })
        .catch(error => {
          console.log(`error getting metrics: ${error.message}`);
        });
    }
  }, [firebase]);

  return (
    <div className="metrics-container">
      <CardMetric name="Partners" value={partners} />
      {metrics !== null && (
        <CardMetric name="Clients Housed" value={metrics.housed} />
      )}
      {metrics !== null && (
        <CardMetric
          name="Still Housed"
          value={`${((metrics.housed / metrics.total) * 100).toFixed(0)}%`}
        />
      )}
    </div>
  );
};

export default Metrics;
