module.exports = {
  siteTitle: 'Zuo Yue | Software Developer',
  siteDescription:
    'Zuo Yue is a Software Developer at Amdocs, who loves learning new things and helping tech beginners.',
  siteKeywords:
    'Zuo Yue, Zuo, Yue, zuozuo12345, software developer, software engineer, content freelancer, face mask, face mask detection, web developer, java developer, pepper content, jamshedpur, amdocs, bit, mesra',
  siteUrl: 'https://zuozuo12345.github.io/',
  siteLanguage: 'en_US',
  name: 'Zuo Yue',
  location: 'Singapore, Singapore',
  email: 'yue.zuo@u.nus.edu',
  github: 'https://github.com/zuozuo12345',
  twitterHandle: '@zuozuo12345',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/zuozuo12345',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/yue-zuo-97a72021a',
    },
    // {
    //   name: 'Codepen',
    //   url: 'https://codepen.io/zuozuo12345',
    // },
    // {
    //   name: 'Instagram',
    //   url: 'https://www.instagram.com/zuozuo12345',
    // },
    // {
    //   name: 'Twitter',
    //   url: 'https://twitter.com/zuozuo12345',
    // },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200) => ({
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
  }),
};
