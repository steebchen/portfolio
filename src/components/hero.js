import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { email, meetingLink } from '../config';

import styled from 'styled-components';
import { theme, mixins, media, Section, A } from '../styles';

const HeroContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
  div {
    width: 100%;
  }
`;
const Hi = styled.h1`
  color: ${theme.colors.green};
  margin: 0 0 20px 3px;
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.SFMono};
  font-weight: normal;
  ${media.desktop`font-size: ${theme.fontSizes.small};`};
  ${media.tablet`font-size: ${theme.fontSizes.smallish};`};
`;
const Name = styled.h2`
  font-size: 80px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const Subtitle = styled.h3`
  font-size: 80px;
  line-height: 1.1;
  color: ${theme.colors.slate};
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const Blurb = styled.div`
  margin-top: 25px;
  width: 50%;
  max-width: 500px;
  a {
    ${mixins.inlineLink};
  }
`;
const EmailButton = styled.a`
  margin-right: 1em;
`;
const EmailLink = styled(A)`
  ${mixins.bigButton};
  font-size: ${theme.fontSizes.smallish};
  margin-top: 50px;
`;

class Hero extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    const { data } = this.props;
    const { frontmatter, html } = data[0].node;

    return (
      <HeroContainer>
        <Hi>{frontmatter.title}</Hi>
        <Name>{frontmatter.name}.</Name>
        <Subtitle>{frontmatter.subtitle}</Subtitle>
        <Blurb dangerouslySetInnerHTML={{ __html: html }} />
        <div>
          <EmailButton>
            <EmailLink href={`mailto:${email}`}>Get In Touch</EmailLink>
          </EmailButton>
          <EmailButton>
            <EmailLink href={meetingLink}>Schedule a meeting</EmailLink>
          </EmailButton>
        </div>
      </HeroContainer>
    );
  }
}

export default Hero;
