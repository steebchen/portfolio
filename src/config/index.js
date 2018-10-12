module.exports = {
  siteTitle: 'Luca Steeb | Full Stack Software Engineer',
  siteDescription:
    'I am a freelancer specializing in creating cloud and SaaS software, using cutting-edge technologies for frontend, backend, dev ops, and more.',
  siteUrl: 'https://luca-steeb.com',
  siteLanguage: 'en_US',
  siteImage: 'https://luca-steeb.com/og.png',

  googleVerification: 'zXuUDqaJPYKMclGSBRUESUB0M5wXzRLfohg1ShrCRSY',

  name: 'Luca Steeb',
  location: 'Stuttgart, Germany',
  email: 'contact@luca-steeb.con',
  socialMedia: [
    {
      name: 'Github',
      url: 'https://github.com/steebchen/',
    },
    {
      name: 'Stackoverflow',
      url: 'https://stackoverflow.com/users/3062017/luca-steeb',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/steebchen/',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/steebchen/',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/steebchen',
    },
  ],

  nav: [
    {
      name: 'About',
      url: '#about',
    },
    {
      name: 'Experience',
      url: '#jobs',
    },
    {
      name: 'Work',
      url: '#projects',
    },
    {
      name: 'Contact',
      url: '#contact',
    },
  ],

  twitterHandle: '@steebchen',
  googleAnalyticsID: 'TODO',

  headerHeight: 100,

  greenColor: '#64ffda',
  navyColor: '#0a192f',

  srConfig: (delay = 200) => {
    return {
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      delay,
      rotate: { x: 0, y: 0, z: 0 },
      opacity: 0,
      scale: 1,
      easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      mobile: true,
      reset: false,
      useDelay: 'always',
      viewFactor: 0.25,
      viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
    };
  },
};
