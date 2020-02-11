/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

// called whenever a new node is created or updated
// exports.onCreateNode = ({ node }) => {
//   console.log(`node: ${node.internal.type}`);
// };

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const storyTemplate = path.resolve('src/templates/storyTemplate.js');

  return await graphql(`
    {
      allPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allPost.edges.forEach(client => {
      createPage({
        path: `/story/${client.node.slug}`,
        component: storyTemplate,
        context: client.node,
      });
    });
  });
};
