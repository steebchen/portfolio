import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { srConfig } from '../config';

import styled from 'styled-components';
import { theme, mixins, media, Section, H3, P, Ul } from '../styles';

import ScrollReveal from 'scrollreveal';

const AboutContainer = styled(Section)`
  position: relative;
`;
const FlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`;
const ContentContainer = styled.div`
  width: 60%;
  max-width: 480px;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;
const SkillsContainer = styled(Ul)`
  margin-top: 20px;
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(2, minmax(140px, 200px));
`;
const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.smallish};
  color: ${theme.colors.slate};
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${theme.colors.green};
    font-size: ${theme.fontSizes.small};
    line-height: 12px;
  }
`;

class About extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  componentDidMount() {
    ScrollReveal().reveal(this.about, srConfig());
  }

  render() {
    const { data } = this.props;
    const { frontmatter, html } = data[0].node;

    return (
      <AboutContainer id="about" innerRef={el => (this.about = el)}>
        <H3>{frontmatter.title}</H3>
        <FlexContainer>
          <ContentContainer>
            <P dangerouslySetInnerHTML={{ __html: html }} />
            <SkillsContainer>
              {frontmatter.skills &&
                frontmatter.skills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
            </SkillsContainer>
          </ContentContainer>
        </FlexContainer>
      </AboutContainer>
    );
  }
}

export default About;
