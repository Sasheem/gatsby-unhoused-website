import React from 'react';
import moment from 'moment';

const BlogDate = props => {
  console.dir(props.date.toDate());
  return <p>{moment(props.date.toDate()).format('MM-DD-YYYY')}</p>;
};

export default BlogDate;
