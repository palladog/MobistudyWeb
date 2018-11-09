
const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '/onBoarding',
        component: () => import('pages/Onboarding.vue')
      },
      {
        path: '/studyDesign',
        component: () => import('pages/StudyDesign.vue')
      },
      {
        path: '/studyDesign/:propStudyKey',
        component: () => import('pages/StudyDesign.vue'),
        props: true
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
