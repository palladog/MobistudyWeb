
const routes = [
  {
    path: '/login',
    component: () => import('pages/login.vue')
  },
  {
    path: '/newuser',
    component: () => import('pages/newuser.vue')
  },
  {
    path: '/admin',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/adminHome.vue')
      }
    ]
  },
  {
    path: '/researcher',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/researcherHome.vue')
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
