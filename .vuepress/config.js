module.exports = {
    themeConfig: {
        nav: [
            { text: 'vue', link: '/vue' },
            { text: 'react', link: '/react' },
            { text: 'webpack', link: '/webpack/webpack' }
        ],
        sidebar: [
            {
                title: 'css',
                collapsable: false,
                children: [
                    ['/basic/css', 'css']
                ]
            },
            {
                title: 'js基础',
                collapsable: false,
                children: [
                    ['/basic/basic', '基础（一）'],
                    ['/basic/reflect', 'reflect'],
                    ['/basic/prototype', 'prototype'],
                    ['/basic/Iterator', 'Iterator']
                ]
            },
            {
                title: '学习内容',
                collapsable: false,
                children: [
                    ['/cli', 'cli'],
                    ['/react', 'react'],
                    ['/vue', 'vue']
                ]
            },
            {
                title: 'webpack',
                collapsable: false,
                children: [
                    ['/webpack/webpack', 'webpack'],
                    ['/webpack/simple-webpack', 'simple-webpack'],
                    ['/webpack/webpack-loader', 'loader'],
                    ['/webpack/webpack-plugin', 'plugin']
                ]
            },
            {
                title: 'node',
                collapsable: false,
                children: [
                    ['/node/node_mock', '使用node mock数据']
                ]
            },
            {
                title: 'typescript',
                collapsable: false,
                children: [
                    ['/typescript/ts', '简介']
                ]
            },
            {
                title: 'svelte',
                collapsable: false,
                children: [
                    ['/svelte', 'svelte']
                ]
            },
            {
                title: 'rollup',
                collapsable: false,
                children: [
                    ['/rollup/rollup', 'rollup']
                ]
            },
            {
                title: '资源优化',
                collapsable: false,
                children: [
                    ['/optimization/static', '静态资源']
                ]
            }
        ],
        displayAllHeaders: true
    },
    title: '学习文档',
    description: '自己学习过程中的记录',
}