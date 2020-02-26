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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ClientJson implements Node {
      id: String!
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const storyTemplate = path.resolve('src/templates/storyTemplate.js');

  return await graphql(`
    {
      allClient {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allClient.edges.forEach(client => {
      createPage({
        path: `/story/${client.node.id}`,
        component: storyTemplate,
        context: { clientId: client.node.id },
      });
    });
  });
};
