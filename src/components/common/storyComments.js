import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Input } from './input';
import { Button } from './button';

/**
 * todo frontend convert from styled to sass
 */

const CommentSection = styled.section`
  max-width: 85%;
  width: 100%;
  margin: 1em auto 5em auto;
  > h2 {
    text-align: left;
  }
`;
const CommentForm = styled.form`
  display: flex;
  margin-top: 1.5em;

  ${Input} {
    margin-right: 0.5em;
    margin-top: auto;
    margin-bottom: auto;
  }
  ${Button} {
    margin: auto 0;
  }
`;
const CommentListItem = styled.div`
  > strong {
    font-size: 80%;
    color: #666;
  }

  border-bottom: 1px solid #ddd;
  padding: 4px 0;
  margin-top: 0.5em;
`;

/**
 *
 * @param {firebase} param0 - firebase context
 * @param {storyId} param1 - the id of client FirstName-LastName
 */
export const StoryComments = ({ firebase, storyId, user }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  console.log(`storyId: ${storyId}`);

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
  }, []);

  // form handler function
  function handlePostCommentSubmit(event) {
    event.preventDefault();
    console.log(`commentText: ${commentText}`);
    firebase.postComment({
      text: commentText,
      clientId: storyId,
    });
  }

  // input change handler
  function handleInputChange(event) {
    event.persist();
    setCommentText(event.target.value);
  }

  return (
    <CommentSection>
      <h3>Words of encouragement</h3>
      {user && (
        <div>
          <h4>Leave a comment</h4>
          <CommentForm onSubmit={handlePostCommentSubmit}>
            <Input value={commentText} onChange={handleInputChange} />
            <Button type="submit">Post comment</Button>
          </CommentForm>
        </div>
      )}
      {comments.map(comment => (
        <CommentListItem key={comment.id}>
          <strong>
            {comment.username} -{' '}
            {moment(comment.dateCreated.toDate()).format('hh:mm Do MMM YYYY')}
          </strong>
          <div>{comment.text}</div>
        </CommentListItem>
      ))}
    </CommentSection>
  );
};
