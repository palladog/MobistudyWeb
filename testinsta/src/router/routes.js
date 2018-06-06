
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/mob_web_initialPage') },
      { path: 'pageIndex', component: () => import('pages/index') },
      { path: 'pageCriteria', component: () => import('pages/criteria') },
      { path: 'pageTasks', component: () => import('pages/tasks') },
      { path: 'pageConsent', component: () => import('pages/consent') },
      { path: 'submissionPreview', component: () => import('pages/submissionPreview') },
      { path: 'finalPage', component: () => import('pages/finalPage') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
