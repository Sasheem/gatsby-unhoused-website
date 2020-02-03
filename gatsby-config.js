module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-firesource`,
      options: {
        credential: require("./firebase.json"),
        types: [
          {
            type: "Client",
            collection: "clientsFeatured",
            map: doc => ({
              name: doc.name,
              goal: doc.goal,
              raised: doc.raised,
              donors: doc.donors,
            }),
          },
          {
            type: "User",
            collection: "users",
            map: doc => ({
              firstName: doc.firstName,
            }),
          },
          {
            type: "Post",
            collection: "clients",
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
