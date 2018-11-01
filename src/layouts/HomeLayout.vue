<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'" >
        <q-toolbar-title>
          MobiStudy
          <span slot="subtitle">Running on Quasar v{{ $q.version }}</span>
        </q-toolbar-title>
      </q-toolbar>

    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
