import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // **MODIFIED:** Use your GitHub Pages URL structure
  url: 'https://sherazi-412002.github.io',
  
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // **MODIFIED:** Set to your repository name
  baseUrl: '/ai-native-sdd-book/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // **MODIFIED:** Use your GitHub username
  organizationName: 'sherazi-412002', 
  // **MODIFIED:** Use your repository name
  projectName: 'ai-native-sdd-book', 

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/sherazi-412002/ai-native-sdd-book/tree/main/ai-ssd-book/', // **MODIFIED (Suggestive):** Updated to your repo and project root
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/sherazi-412002/ai-native-sdd-book/tree/main/ai-ssd-book/', // **MODIFIED (Suggestive):** Updated to your repo and project root
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'AI Native Book Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'module1Sidebar',
          position: 'left',
          label: 'Module 1',
        },
        {
          type: 'docSidebar',
          sidebarId: 'module2Sidebar',
          position: 'left',
          label: 'Module 2',
        },
        {
          type: 'docSidebar',
          sidebarId: 'module3Sidebar',
          position: 'left',
          label: 'Module 3',
        },
        {
          type: 'docSidebar',
          sidebarId: 'module4Sidebar',
          position: 'left',
          label: 'Module 4',
        },
        {
          href: 'https://github.com/sherazi-412002/ai-native-sdd-book', // **MODIFIED:** Updated to your repo
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/sherazi-412002/ai-native-sdd-book', // **MODIFIED:** Updated to your repo
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
