import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/layout';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';

const PostContainer = styled(Main)`
  ${mixins.sidePadding};
  margin: 0 auto;
  max-width: 800px;
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 100px;
  ${media.tablet`padding-top: 150px;`};
`;
const BackLink = styled(Link)`
  ${mixins.inlineLink};
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.smallish};
  margin-bottom: 50px;
  display: inline-block;
`;
const PostHeader = styled.header`
  margin-bottom: 50px;
`;
const Title = styled.h1`
  font-size: 50px;
  color: ${theme.colors.lightestSlate};
  margin: 10px 0 20px;
  ${media.tablet`font-size: 40px;`};
  ${media.phablet`font-size: 32px;`};
`;
const PostDate = styled.span`
  color: ${theme.colors.green};
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.smallish};
`;
const PostContent = styled.div`
  color: ${theme.colors.slate};
  font-size: ${theme.fontSizes.large};
  line-height: 1.6;

  h2 {
    color: ${theme.colors.lightestSlate};
    font-size: ${theme.fontSizes.h3};
    margin: 40px 0 20px;
    ${media.tablet`font-size: 24px;`};
  }
  p {
    margin: 0 0 20px;
  }
  a {
    ${mixins.inlineLink};
  }
  ul {
    margin: 0 0 20px;
  }
  strong {
    color: ${theme.colors.lightestSlate};
  }
  code {
    font-family: ${theme.fonts.SFMono};
    font-size: ${theme.fontSizes.small};
    background-color: ${theme.colors.lightNavy};
    border-radius: ${theme.borderRadius};
    padding: 2px 6px;
  }
  pre {
    background-color: ${theme.colors.lightNavy};
    border-radius: ${theme.borderRadius};
    padding: 20px;
    overflow-x: auto;
    margin: 0 0 20px;
    code {
      background-color: transparent;
      padding: 0;
    }
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date } = frontmatter;

  return (
    <Layout location={location}>
      <PostContainer id="content">
        <BackLink to="/blog">&larr; All posts</BackLink>
        <PostHeader>
          <PostDate>{date}</PostDate>
          <Title>{title}</Title>
        </PostHeader>
        <PostContent dangerouslySetInnerHTML={{ __html: html }} />
      </PostContainer>
    </Layout>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`;
