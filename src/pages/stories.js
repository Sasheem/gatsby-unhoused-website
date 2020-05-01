import React, { useContext } from 'react';
import { FirebaseContext } from '../components/Firebase';

import SEO from '../components/seo';

import '../styles/global.scss';

import { SuccessClients } from '../components/Blog/successClients';

/**
 * todo move pagination logic here so arrow buttons can take advantage of it
 * * brainstorm how arrow buttons handle state of currentPage
 */

const StoriesPage = ({ location }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};
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
          {firebase && (
            <SuccessClients
              firebase={firebase}
              nextPage={
                location.state.nextPage ? location.state.nextPage : null
              }
            />
          )}
          <div />
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
