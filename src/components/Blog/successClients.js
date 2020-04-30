import React, { useState, useEffect } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';

import BlogGrid from './blogGrid';
import Pagination from './pagination';

import LeftArrow from '../../assets/chevron-left-solid.svg';
import RightArrow from '../../assets/chevron-right-solid.svg';

export const SuccessClients = ({ firebase }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  // applying this form of useEffect ensures
  // it only runs once when the component mounts
  // useEffect(() => {}, []);

  // adding empty array as second arg means useEffect will only
  // run when the component is mounted and won't run when the
  // component is updated
  useEffect(() => {
    if (firebase) {
      setLoading(true);
      const unsubscribe = firebase.subscribeToSuccessClients({
        onSnapshot: snapshot => {
          console.dir(snapshot);
          const snapshotClients = [];

          // forEach provided from firebase, not javascript forEach
          // it behaves the same though
          // data() returns the data for a snapshot
          snapshot.forEach(doc => {
            snapshotClients.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          setClients(snapshotClients);
          setLoading(false);
        },
      });

      // when the effect ends, it can return
      // we use this cause its similar to componentDidUnmount
      return () => {
        if (unsubscribe) {
          console.log(`running unsubscribe`);
          unsubscribe();
          setLoading(false);
        }
      };
    }
  }, []);

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentClients = clients.slice(indexOfFirstPost, indexOfLastPost);

  // change page number
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    scrollTo('#blog-layout');
  };

  return (
    <div>
      <BlogGrid clients={currentClients} />
      <div className="pagination">
        <LeftArrow className="pagination-icon" />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={clients.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <RightArrow className="pagination-icon" />
      </div>
    </div>
  );
};
