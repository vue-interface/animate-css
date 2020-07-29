const path = require('path');

module.exports = {
    serviceWorker: true,
    title: 'Vue Interface',
    description: 'A collection of standalone UI components built for Vue.',
    plugins: [
        ['vuepress-plugin-template-constants', {
            pkg: require(path.resolve('package.json'))
        }],
        ['@vuepress/register-components', {
            components: [{
                name: 'alert',
                path: path.resolve('main')
            }]
        }]
    ],
    themeConfig: {
        sidebarDepth: 2,
        sidebar: {
            // fallback
            '/': [
                '',
                'options',
                'tailwindcss',
            ]
        },
        footer: "Ⓒ Active Engagement, LLC"
        /*
        nav: [
          { text: "Works", link: "/", position: "left", external: false },
          { text: "Instagram", link: "https://www.instagram.com/its.nwa/", position: "left", external: true },
          { text: "Say hi!", link: "mailto:sayhi@mydomain.com", position: "right", external: true },
          { text: 'Journal', link: '/journal/', position: 'right', external: false },
        ]
        */
    },
    postcss: {
        plugins: [
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer')
        ]
    }
};