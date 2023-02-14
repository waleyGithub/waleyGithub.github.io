// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'waley',
  //tagline: 'Dinosaurs are cool',
  favicon: 'img/waley.jpg',

  // Set the production url of your site here
  url: 'https://waleyGithub.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'waleyGithub', // Usually your GitHub org/user name.
  projectName: 'waleyGithub.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
      docs: {
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
//          editUrl:
//            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  
    
plugins: [
  [
    "@docusaurus/plugin-content-docs",
    {
      id: "writing",
      path: "IELTS/writing",
      routeBasePath: "writing",
      sidebarPath: require.resolve("./sidebars.js"),
//      editUrl: "https://git.7wate.com/zhouzhongping/wiki/src/branch/master",
      showLastUpdateAuthor: true,
      showLastUpdateTime: true,
      breadcrumbs: false,
    },
  ],
          
  [
    "@docusaurus/plugin-content-docs",
    {
      id: "reading",
      path: "IELTS/reading",
      routeBasePath: "reading",
      sidebarPath: require.resolve("./sidebars.js"),
//      editUrl: "https://git.7wate.com/zhouzhongping/wiki/src/branch/master",
      showLastUpdateAuthor: true,
      showLastUpdateTime: true,
      breadcrumbs: false,
    },
  ],

  [
    "@docusaurus/plugin-content-docs",
    {
      id: "listening",
      path: "IELTS/listening",
      routeBasePath: "listening",
      sidebarPath: require.resolve("./sidebars.js"),
//      editUrl: "https://git.7wate.com/zhouzhongping/wiki/src/branch/master",
      showLastUpdateAuthor: true,
      showLastUpdateTime: true,
      breadcrumbs: false,
    },
  ],
  
  [
    "@docusaurus/plugin-content-docs",
    {
      id: "speaking",
      path: "IELTS/speaking",
      routeBasePath: "speaking",
      sidebarPath: require.resolve("./sidebars.js"),
//      editUrl: "https://git.7wate.com/zhouzhongping/wiki/src/branch/master",
      showLastUpdateAuthor: true,
      showLastUpdateTime: true,
      breadcrumbs: false,
    },
  ],




  [
    "@docusaurus/plugin-content-docs",
    {
      id: "Product-Manager",
      path: "Project/Product Manager",
      routeBasePath: "Product Manager",
      sidebarPath: require.resolve("./sidebars.js"),
//      editUrl: "https://git.7wate.com/zhouzhongping/wiki/src/branch/master",
      showLastUpdateAuthor: true,
      showLastUpdateTime: true,
      breadcrumbs: false,
    },
  ],
  
  
  [
    "@docusaurus/plugin-content-docs",
    {
      id: "Coding",
      path: "Project/Coding",
      routeBasePath: "Coding",
      sidebarPath: require.resolve("./sidebars.js"),
//      editUrl: "https://git.7wate.com/zhouzhongping/wiki/src/branch/master",
      showLastUpdateAuthor: true,
      showLastUpdateTime: true,
      breadcrumbs: false,
    },
  ],
  
],

    
    
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/waley.jpg',
      navbar: {
        hideOnScroll: true,
        title: "Hao Wu's Homepage",
//        hideOnScroll: true,
        logo: {
          alt: 'My Site Logo',
          src: 'img/waley.jpg',
        },
          
          
        items: [
          {to: '/blog', label: '📘 Blog', position: 'left'},
          {
            position: "left",
            label: "🎓 IELTS",
            items: [
              {
                label: "Writing",
                to: "/writing",
              },
              {
                label: "Reading",
                to: "/reading",
              },
              {
                label: "Listening",
                to: "/listening",
              },
              {
                label: "Speaking",
                to: "/speaking",
              },
                ]
          },
        {
            position:"left",
            label:"🗂️ Project",
            items:[
                {
                  label: "Product Manager",
                  to: "/product manager",
                },
                {
                  label: "Coding",
                  to: "/coding",
                },
                  ]
        },
//          {
//            href: 'https://github.com/waleyCode/',
//            label: 'GitHub',
//            position: 'right',
//          },
        ],
      },
        
//      umami: {
//      websiteid: "7efcd733-c232-43db-9f17-10a00c53b152",
//      src: "https://umami.7wate.org/umami.js",
//      },
        
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Hao Wu's Homepage. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
