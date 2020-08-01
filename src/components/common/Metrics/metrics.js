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
      const unsubscribe = firebase.subscribeToClientsMetrics({
        onSnapshot: snapshot => {
          console.log(`snapshot: ${typeof snapshot}`);
          console.dir(snapshot.data());
          setMetrics(snapshot.data());
        },
      });

      const unsubscribePartners = firebase.subscribeToPartnersMetrics({
        onSnapshot: snapshot => {
          snapshot.forEach(doc => (partnerCount += 1));
          setPartners(partnerCount);
        },
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
        if (unsubscribePartners) {
          unsubscribePartners();
        }
      };
    }
  }, [firebase]);

  const housedBuffer = metrics ? metrics.housed + 52 : 0;
  const totalBuffer = metrics ? metrics.total + 52 : 0;
  return (
    <div className="metrics-container">
      {partners !== 0 && <CardMetric name="Partners" value={partners} />}
      {metrics !== null && (
        <CardMetric name="Clients Housed" value={housedBuffer} />
      )}
      {metrics !== null && (
        <CardMetric
          name="Still Housed"
          value={`${((housedBuffer / totalBuffer) * 100).toFixed(0)}%`}
        />
      )}
    </div>
  );
};

export default Metrics;
