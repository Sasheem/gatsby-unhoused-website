import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../components/Firebase';

import SEO from '../components/seo';

import '../styles/global.scss';

import BlogGrid from '../components/Blog/blogGrid';

const StoriesPage = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [clients, setClients] = useState([]);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  // applying this form of useEffect ensures
  // it only runs once when the component mounts
  // useEffect(() => {}, []);
  useEffect(() => {
    // query all available clients if firebase exists
    if (firebase) {
      firebase.getClients().then(snapshot => {
        // check if component is mounted
        if (isMounted) {
          const availableClients = [];
          snapshot.forEach(doc => {
            availableClients.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          // save clients to state
          setClients(availableClients);
        }
      });
    }
  }, [firebase]);

  return (
    <div>
      <SEO title="Stories" />
      <div className="blog-container">
        <h1>Blog: Success Stories</h1>
        <p className="blog-subtext">
          Read the stories of all the families and individuals Unhoused Humanity
          has impacted.
        </p>
        <div className="form-container">
          <div />
          {/* <BlogGrid clients={props.data.allPost.edges} /> */}
          <BlogGrid clients={clients} />
          <div />
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
