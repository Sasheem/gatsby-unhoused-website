import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../components/Firebase';
import scrollTo from 'gatsby-plugin-smoothscroll';

import LeftArrow from '../assets/chevron-left-solid.svg';
import RightArrow from '../assets/chevron-right-solid.svg';
import SEO from '../components/seo';

import '../styles/global.scss';

import BlogGrid from '../components/Blog/blogGrid';
import Pagination from '../components/Blog/pagination';

/**
 * todo move pagination logic here so arrow buttons can take advantage of it
 * * brainstorm how arrow buttons handle state of currentPage
 */

const StoriesPage = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [isMounted, setIsMounted] = useState(true);
  // let isMounted = true;

  useEffect(() => {
    return () => {
      // isMounted = false;
      setIsMounted(false);
    };
  }, []);

  // applying this form of useEffect ensures
  // it only runs once when the component mounts
  // useEffect(() => {}, []);
  useEffect(() => {
    // query all available clients if firebase exists
    if (firebase) {
      firebase.getClients().then(snapshot => {
        setLoading(true);
        // check if component is mounted
        if (isMounted) {
          const availableClients = [];
          snapshot.forEach(doc => {
            if (doc.data().status === 'Housed') {
              availableClients.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });

          // save clients to state
          setClients(availableClients);
          setLoading(false);
        }
      });
    }
  }, [firebase]);

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
      <SEO title="Stories" />
      <div className="blog-container" id="blog-layout">
        <h1 id="blog-main-title">Blog: Success Stories</h1>
        <p className="blog-subtext">
          Read the stories of all the families and individuals Unhoused Humanity
          has impacted.
        </p>
        <div className="form-container">
          <div />
          <div>
            <BlogGrid clients={currentClients} loading={loading} />
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
          <div />
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
