import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Input } from './input';
import { Button } from './button';

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
`;

// adding empty array as second arg means useEffect will only
// run when the component is mounted and won't run when the
// component is updated
export const StoryComments = ({ firebase, storyId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  console.log(`storyId: ${storyId}`);

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
      <h2>Leave a comment</h2>
      <CommentForm onSubmit={handlePostCommentSubmit}>
        <Input value={commentText} onChange={handleInputChange} />
        <Button type="submit">Post comment</Button>
      </CommentForm>
      {comments.map(comment => (
        <CommentListItem key={comment.id}>
          <strong>{comment.username}</strong>
          <div>{comment.text}</div>
        </CommentListItem>
      ))}
    </CommentSection>
  );
};
