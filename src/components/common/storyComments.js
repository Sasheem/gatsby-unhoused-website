import React, { useEffect } from 'react';

// adding empty array as second arg means useEffect will only
// run when the component is mounted and won't run when the
// component is updated
export const StoryComments = ({ firebase, storyId }) => {
  console.log(`storyId: ${storyId}`);
  useEffect(() => {
    const unsubscribe = firebase.subscribeToStoryComments({
      storyId,
      onSnapshot: snapshot => {
        console.dir(snapshot);
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
  return <div>test</div>;
};
