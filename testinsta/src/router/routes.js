
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'pagecriteria', component: () => import('pages/criteria') },
      { path: 'pagetasks', component: () => import('pages/tasks') },
      { path: 'pageconsent', component: () => import('pages/consent') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
