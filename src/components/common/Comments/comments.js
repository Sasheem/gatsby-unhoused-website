import React, { useEffect, useState } from 'react';
import moment from 'moment';

import ButtonSubmit from '../Button/buttonSubmit';

import './comments.scss';

const Comments = ({ firebase, storyId, user }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // adding empty array as second arg means useEffect will only
  // run when the component is mounted and won't run when the
  // component is updated
  useEffect(() => {
    const unsubscribe = firebase.subscribeToStoryComments({
      storyId,
      onSnapshot: snapshot => {
        console.dir(snapshot);
        const snapshotComments = [];

        // forEach provided from firebase, not javascript forEach
        // it behaves the same though
        // data() returns the data for a snapshot
        snapshot.forEach(doc => {
          snapshotComments.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setComments(snapshotComments);
      },
    });

    // when the effect ends, it can return
    // we use this cause its similar to componentDidUnmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [firebase]);

  console.log(`comments:`);
  console.dir(comments);

  // form handler function
  function handlePostCommentSubmit(event) {
    event.preventDefault();
    console.log(`commentText: ${commentText}`);
    setIsProcessing(true);
    firebase
      .postComment({
        text: commentText,
        clientId: storyId,
      })
      .then(() => {
        setCommentText('');
      })
      .catch(error => {
        setCommentText('');
        console.log(`postComment error: ${error.message}`);
      });
    setIsProcessing(false);
  }

  // input change handler
  function handleInputChange(event) {
    event.persist();
    setCommentText(event.target.value);
  }

  return (
    <section className="comments-section">
      {comments.length !== 0 && <h3>Message of encouragement</h3>}
      {user && (
        <div>
          <h4>Leave a comment</h4>
          <form className="comments-form" onSubmit={handlePostCommentSubmit}>
            <input
              className="comments-form-input"
              value={commentText}
              onChange={handleInputChange}
              placeholder="Provide some warm words of encouragement"
            />
            <ButtonSubmit
              type="submit"
              value={`${isProcessing ? 'Processing...' : 'Post Message'}`}
            />
          </form>
        </div>
      )}
      {comments.map(comment => (
        <div className="comments-list-item" key={comment.id}>
          <p>
            <strong>
              {comment.username} -{' '}
              {moment(comment.dateCreated.toDate()).format('hh:mm Do MMM YYYY')}
            </strong>
          </p>

          <p>{comment.text}</p>
        </div>
      ))}
    </section>
  );
};

export default Comments;
