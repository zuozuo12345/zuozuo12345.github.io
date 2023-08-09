/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');
const languages = [
  { lang: 'en', ext: 'en.md' },
  { lang: 'cn', ext: 'cn.md' },
];



exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve('src/templates/tag.js');


  languages.forEach(async languageObj => {

    // const heroRegex = `/hero/${languageObj.lang}/`;
    // const aboutRegex = `/about/${languageObj.lang}/`;

    const result = await graphql(`
      {
        postsRemark: allMarkdownRemark(
          filter: { fileAbsolutePath:  { regex: "/posts/.*\\.${languageObj.ext}$/" } }
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `);

    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    // Create post detail pages
    const posts = result.data.postsRemark.edges;
    posts.forEach(({ node }) => {
      createPage({
        path: `/${node.frontmatter.slug}`,
        component: postTemplate,
        context: {
          language: `${languageObj.lang}`,
       
        },
      });
    });

    // Extract tag data from query
    const tags = result.data.tagsGroup.group;
    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/${languageObj.lang}/pensieve/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      });
    });
  });
};


// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
