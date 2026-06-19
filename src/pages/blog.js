import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/layout';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';

const BlogContainer = styled(Main)`
  ${mixins.sidePadding};
  counter-reset: section;
  margin: 0 auto;
  max-width: 1000px;
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 100px;
  ${media.tablet`padding-top: 150px;`};
`;
const Title = styled.h1`
  font-size: 60px;
  color: ${theme.colors.lightestSlate};
  margin: 0 0 10px;
  ${media.tablet`font-size: 50px;`};
  ${media.phablet`font-size: 40px;`};
`;
const Subtitle = styled.p`
  color: ${theme.colors.slate};
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.medium};
  margin: 0 0 60px;
`;
const PostList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const PostItem = styled.li`
  margin-bottom: 30px;
`;
const PostLink = styled(Link)`
  display: block;
  background-color: ${theme.colors.lightNavy};
  border-radius: ${theme.borderRadius};
  padding: 30px;
  transition: ${theme.transition};
  text-decoration: none;
  &:hover,
  &:focus {
    transform: translateY(-5px);
    outline: 0;
  }
`;
const PostDate = styled.span`
  color: ${theme.colors.green};
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.smallish};
`;
const PostTitle = styled.h2`
  color: ${theme.colors.lightestSlate};
  font-size: ${theme.fontSizes.xxlarge};
  margin: 10px 0;
  transition: ${theme.transition};
  ${PostLink}:hover & {
    color: ${theme.colors.green};
  }
`;
const PostDescription = styled.p`
  color: ${theme.colors.slate};
  font-size: ${theme.fontSizes.medium};
  margin: 0;
`;

const BlogPage = ({ data, location }) => {
  const posts = data.posts.edges;

  return (
    <Layout location={location}>
      <BlogContainer id="content">
        <Title>Blog</Title>
        <Subtitle>Thoughts, notes, and the occasional write-up.</Subtitle>
        <PostList>
          {posts.map(({ node }) => {
            const { title, description, date, slug } = node.frontmatter;
            return (
              <PostItem key={slug}>
                <PostLink to={`/blog/${slug}`}>
                  <PostDate>{date}</PostDate>
                  <PostTitle>{title}</PostTitle>
                  <PostDescription>{description}</PostDescription>
                </PostLink>
              </PostItem>
            );
          })}
        </PostList>
      </BlogContainer>
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default BlogPage;

export const query = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`;
