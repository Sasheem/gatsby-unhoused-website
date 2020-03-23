require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: `Unhoused Humanity Website`,
    description: `Join our movement to end homelessness in Tallahassee. Learn about homelessness and read some of our client success stories. Donate to our cause to help combat homelessness in Tallahassee, Florida.`,
    author: `@sasheemdev`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `alegreya sans`,
          `open sans\:300,400,400i,700`, // you can also specify font weights and styles
        ],
        display: 'swap',
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-firesource`,
      options: {
        credential: {
          type: process.env.FIREBASE_TYPE,
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: process.env.FIREBASE_AUTH_URI,
          token_uri: process.env.FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url:
            process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        },
        types: [
          {
            type: 'Client',
            collection: 'clientsFeatured',
            map: doc => ({
              firstName: doc.firstName,
              lastName: doc.lastName,
              situation: doc.situation,
              dateFundingBegan: doc.dateFundingBegan,
              dateHoused: doc.dateHoused,
              familySize: doc.familySize,
              questions: doc.questions,
              answers: doc.answers,
              imageUrl: doc.imageUrl,
              status: doc.status,
              goal: doc.goal,
              raised: doc.raised,
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
              imageUrl: doc.imageUrl,
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
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'Client',
        imagePath: 'imageUrl',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
