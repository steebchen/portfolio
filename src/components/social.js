import React, { Component } from 'react';

import { socialMedia } from '../config';

import { IconGithub, IconLinkedin, IconInstagram, IconTwitter, IconStackoverflow } from './icons';

import styled from 'styled-components';
import { theme, media, A, Ul } from '../styles';

const SocialContainer = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: 40px;
  color: ${theme.colors.lightSlate};
  ${media.desktop`left: 25px;`};
  ${media.tablet`display: none;`};
`;
const SocialItemList = styled(Ul)`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${theme.colors.lightSlate};
  }
`;
const SocialItem = styled.li`
  &:last-of-type {
    margin-bottom: 20px;
  }
`;
const SocialLink = styled(A)`
  padding: 10px;
  svg {
    width: 18px;
    height: 18px;
  }
`;

class Social extends Component {
  render() {
    return (
      <SocialContainer>
        <SocialItemList>
          {socialMedia &&
            socialMedia.map(({ url, name }, i) => (
              <SocialItem key={i}>
                <SocialLink
                  href={url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label={name}>
                  {name === 'Github' ? (
                    <IconGithub />
                  ) : name === 'Linkedin' ? (
                    <IconLinkedin />
                  ) : name === 'Instagram' ? (
                    <IconInstagram />
                  ) : name === 'Stackoverflow' ? (
                    <IconStackoverflow />
                  ) : name === 'Twitter' ? (
                    <IconTwitter />
                  ) : (
                    '–'
                  )}
                </SocialLink>
              </SocialItem>
            ))}
        </SocialItemList>
      </SocialContainer>
    );
  }
}

export default Social;
