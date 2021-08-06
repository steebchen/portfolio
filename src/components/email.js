import React, { Component } from 'react';

import { email } from '../config';

import styled from 'styled-components';
import { theme, media, A } from '../styles';

const EmailContainer = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  right: 40px;
  color: ${theme.colors.lightSlate};
  ${media.desktop`right: 25px;`};
  ${media.tablet`display: none;`};
  div {
    width: 100%;
    margin: 0 auto;
  }
`;
const EmailLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${theme.colors.lightSlate};
  }
`;
const EmailLink = styled(A)`
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.xsmall};
  letter-spacing: 0.5px;
  writing-mode: vertical-rl;
  margin: 20px auto;
  padding: 10px;
`;

class Email extends Component {
  render() {
    return (
      <EmailContainer>
        <EmailLinkWrapper>
          <EmailLink href={`mailto:${email}`}>{email}</EmailLink>
        </EmailLinkWrapper>
      </EmailContainer>
    );
  }
}

export default Email;
