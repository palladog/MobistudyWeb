// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios', 'vuelidate'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      },
      env: {
        WEB_VERSION: JSON.stringify(require('./package.json').version),
        API_ENDPOINT: JSON.stringify('/api') // you can specify the full address here if served on another domain
      }
    },
    devServer: {
      open: true, // opens browser window automatically,
      // https: true,
      port: 8181,
      proxy: {
        '/api': { // <- this must be the same as API_ENDPOINT
          target: 'http://127.0.0.1:3000',
          changeOrigin: true
        }
      }
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QAutocomplete',
        'QBtn',
        'QBtnDropdown',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QCheckbox',
        'QChipsInput',
        'QCollapsible',
        'QDatetime',
        'QField',
        'QIcon',
        'QInput',
        'QItem',
        'QItemMain',
        'QItemSeparator',
        'QItemSide',
        'QItemTile',
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QList',
        'QListHeader',
        'QModal',
        'QOptionGroup',
        'QPageContainer',
        'QPage',
        'QRadio',
        'QSelect',
        'QSpinner',
        'QTab',
        'QTabs',
        'QTabPane',
        'QTable',
        'QTd',
        'QToolbar',
        'QToolbarTitle',
        'QRouteTab'
      ],
      directives: [
        'Ripple', 'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify', 'Dialog'
      ],
      iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
    },
    // animations: 'all' --- includes all animations
    animations: [
    ],
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
