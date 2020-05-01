import React, { useState, useEffect } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { navigate } from 'gatsby';

import BlogGrid from './blogGrid';
import Pagination from './pagination';

export const SuccessClients = ({ firebase, nextPage }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  // const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  // const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  // const [currentClients, setCurrentClients] = useState([]);

  // applying this form of useEffect ensures
  // it only runs once when the component mounts
  // useEffect(() => {}, []);

  // run once when the component mounts, if nextPage exist
  // then set that to currentPage, OW keep it at 1;
  useEffect(() => {
    console.log(`successClients useEffect firing with nextPage: ${nextPage}`);
    setCurrentPage(nextPage === null ? 1 : nextPage);
    console.log(`currentPage * postsPerPage: ${currentPage} * ${postsPerPage}`);
    // setIndexOfLastPost(currentPage * postsPerPage);
    // setIndexOfFirstPost(indexOfLastPost - postsPerPage);
    // setCurrentClients(clients.slice(indexOfFirstPost, indexOfLastPost));
    console.log(`currentPage: ${currentPage}`);
    return () => {};
  }, [nextPage]);

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
  console.log(`indexOfLastPost: ${indexOfLastPost}`);
  console.log(`indexOfFirstPost: ${indexOfFirstPost}`);
  console.dir(currentClients);

  // change page number
  const paginate = pageNumber => {
    // setCurrentPage(pageNumber);
    navigate('/stories/', { state: { nextPage: pageNumber } });
    // scrollTo('#blog-layout');
  };

  return (
    <div>
      <BlogGrid clients={currentClients} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={clients.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};
