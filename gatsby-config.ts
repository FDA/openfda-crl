import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: `/crltable`,
  siteMetadata: {
    title: `Complete Response Letters`,
    siteUrl: `https://openfda-site.preprod.fda.gov`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`, // Name your image source
        path: `${__dirname}/src/images`, // Path to your images folder
      }
    }
    ]
};

export default config;
