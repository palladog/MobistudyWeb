
const routes = [
  {
    path: '/',
    component: () => import('layouts/StudyDesignLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/StudyDesign.vue'),
        props: { studyKey: 32922302 }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
