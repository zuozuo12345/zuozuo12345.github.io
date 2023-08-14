import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact } from '@components';
import styled from 'styled-components';
import { Main } from '@styles';
import { useLanguage,LanguageProvider, LanguageContext } from '@styles/LanguageContext'; 



const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;



const IndexPage = ({ location, data }) => {
  return (
    <LanguageProvider>
      <IndexContent location={location} data={data} />
    </LanguageProvider>
  );
};

const IndexContent = ({ location, data }) => {
  const { language } = useContext(LanguageContext);
  console.log("language in index", language);
  console.log("data in index", data);
  const filteredHeroEdges = data.hero.edges.filter(edge => edge.node.frontmatter.lang === language);
  const filteredAboutEdges = data.about.edges.filter(edge => edge.node.frontmatter.lang === language);
  const filteredJobsEdges = data.jobs.edges.filter(edge => edge.node.frontmatter.lang === language);
  const filteredFeaturedEdges = data.featured.edges.filter(edge => edge.node.frontmatter.lang === language);
  const filteredProjectsEdges = data.projects.edges.filter(edge => edge.node.frontmatter.lang === language);
  const filteredContactEdges = data.contact.edges.filter(edge => edge.node.frontmatter.lang === language);

  return (
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <Hero data={filteredHeroEdges} />
        <About data={filteredAboutEdges} />
        <Jobs data={filteredJobsEdges} />
        <Featured data={filteredFeaturedEdges} />
        <Projects data={filteredProjectsEdges} />
        <Contact data={filteredContactEdges} />
      </StyledMainContainer>
    </Layout>
  );
};

IndexContent.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
{
  hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
    edges {
      node {
        frontmatter {
          title
          name
          lang
          subtitle
          buttonText
        }
        html
      }
    }
  }
    about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          frontmatter {
            title
            lang
            avatar {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            skills
          }
          html
        }
      }
    }
    jobs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/jobs/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            lang
            company
            range
            url
          }
          html
        }
      }
    }
    featured: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/featured/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            lang
            cover {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            tech
            github
            external
          }
          html
        }
      }
    }
    projects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { showInProjects: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            tech
            lang
            github
            external
          }
          html
        }
      }
    }
    contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          frontmatter {
            title
            lang
            buttonText
          }
          html
        }
      }
    }
  }
`;