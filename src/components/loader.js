import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import anime from 'animejs';

import styled from 'styled-components';
import { theme, mixins } from '../styles';

const LoaderContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${theme.colors.darkNavy};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;
const LogoWrapper = styled.div`
  width: max-content;
  max-width: 100px;
  transition: ${theme.transition};
  opacity: ${props => (props.isMounted ? 1 : 0)};
  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    fill: none;
    user-select: none;
    #B {
      opacity: 0;
    }
  }
`;

class Loader extends Component {
  static propTypes = {
    finishLoading: PropTypes.func.isRequired,
  };

  state = {
    isMounted: false,
  };

  componentDidMount() {
    this.setState({ isMounted: true }, () => this.animate());
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  animate() {
    const loader = anime.timeline({
      complete: () => this.props.finishLoading(),
    });

    loader
      .add({
        targets: '#logo path',
        delay: 100,
        duration: 200,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #B',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo',
        delay: 200,
        duration: 100,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 100,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  }

  render() {
    const { isMounted } = this.state;

    return (
      <LoaderContainer className="loader">
        <Helmet>
          <body className={isMounted ? 'hidden' : ''} />
        </Helmet>
        <LogoWrapper isMounted={isMounted}>
          <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <title>Loader Logo</title>
            <g>
              <g id="B" transform="translate(10.000000, 2.000000)">
                <path fill="#64FFDA" d="M31.9,32.7H38v25.6h14.1v5.1H31.9V32.7z" />
              </g>
              <path
                stroke="#64FFDA"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 50, 5
                  L 11, 27
                  L 11, 72
                  L 50, 95
                  L 89, 73
                  L 89, 28 z"
              />
            </g>
          </svg>
        </LogoWrapper>
      </LoaderContainer>
    );
  }
}

export default Loader;
