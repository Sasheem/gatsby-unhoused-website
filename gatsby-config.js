module.exports = {
  siteMetadata: {
    title: `Unhoused Humanity Website`,
    description: `Join our movement to end homelessness in Tallahassee. Learn about homelessness and read some of our client success stories. Donate to our cause to help combat homelessness in Tallahassee, Florida.`,
    author: `@sasheemdev`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-firesource`,
      options: {
        credential: require('./firebase.json'),
        types: [
          {
            type: 'Client',
            collection: 'clientsFeatured',
            map: doc => ({
              name: doc.name,
              goal: doc.goal,
              raised: doc.raised,
              donors: doc.donors,
            }),
          },
          {
            type: 'User',
            collection: 'users',
            map: doc => ({
              firstName: doc.firstName,
            }),
          },
          {
            type: 'Post',
            collection: 'clients',
            map: doc => ({
              firstName: doc.firstName,
              lastName: doc.lastName,
              goal: doc.goal,
              raised: doc.raised,
              questions: doc.questions,
              answers: doc.answers,
              situation: doc.situation,
              familySize: doc.familySize,
              status: doc.status,
              donors: doc.donors,
              dateHoused: doc.dateHoused,
              dateFundingBegan: doc.dateFundingBegan,
              slug: doc.slug,
            }),
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/house-icon-dark.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
