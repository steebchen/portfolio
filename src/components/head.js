import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from '../config';

const Head = ({ metaData }) => (
  <Helmet>
    <html lang="en" prefix="og: http://ogp.me/ns#" />
    <title itemProp="name" lang="en">
      {metaData.title}
    </title>
    <meta name="description" content={metaData.description} />
    <meta name="keywords" content={config.siteKeywords} />
    <meta name="google-site-verification" content={config.googleVerification} />
    <meta property="og:title" content={metaData.title} />
    <meta property="og:description" content={metaData.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={metaData.siteUrl} />
    <meta property="og:site_name" content={metaData.title} />
    <meta property="og:image" content={config.siteImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:locale" content={config.siteLanguage} />
    <meta itemProp="name" content={metaData.title} />
    <meta itemProp="description" content={metaData.description} />
    <meta itemProp="image" content={config.siteImage} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={metaData.siteUrl} />
    <meta name="twitter:site" content={config.twitterHandle} />
    <meta name="twitter:creator" content={config.twitterHandle} />
    <meta name="twitter:title" content={metaData.title} />
    <meta name="twitter:description" content={metaData.description} />
    <meta name="twitter:image:src" content={config.siteImage} />
    <meta name="twitter:image:alt" content={metaData.title} />

    <meta name="theme-color" content={config.navyColor} />
  </Helmet>
);

export default Head;

Head.propTypes = {
  metaData: PropTypes.object.isRequired,
};
