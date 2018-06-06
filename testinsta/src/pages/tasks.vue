<template>
  <q-page>
    <div>
      <q-tabs align="justify">
        <q-route-tab slot="title" name="tab-1" icon="subject" label="Generalities" to="/" exact />
        <q-route-tab slot="title" name="tab-2" icon="fingerprint" label="Inclusion Criteria" to="/pagecriteria" exact />
        <q-route-tab slot="title" name="tab-3" icon="list" label="Tasks" to="/pagetasks" exact />
        <q-route-tab slot="title" name="tab-4" icon="verified_user" label="Consent" to="/pageconsent" exact />
      </q-tabs>
    </div>
    <q-btn-dropdown label="Add a task" class="q-ma-md">
      <q-list link>
        <q-item>
          <q-item-main>
            <q-item-tile label>Form</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-item-tile label>Data query</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <div class="data-query-container">
      <form action="">
        <ul class="flex-outer" id="data-query-form">
          <li>
            <q-select v-model="select" :options="options" />
            <label for="data-query-input">Data Query:</label>
             <q-btn-dropdown color="primary" label="Types of Data">
              <q-list link>
                <q-item v-close-overlay @click.native="showNotification">
                  <q-item-side icon="folder" inverted color="primary" />
                  <q-item-main>
                    <q-item-tile label>Steps</q-item-tile>
                    <!-- <q-item-tile sublabel>February 22, 2016</q-item-tile> -->
                  </q-item-main>
                  <q-item-side right icon="info" color="amber" />
                </q-item>
                <q-item-separator inset />
                <q-item v-close-overlay @click.native="showNotification">
                  <q-item-side icon="assignment" inverted color="secondary" />
                  <q-item-main>
                    <q-item-tile label>Weight</q-item-tile>
                    <!-- <q-item-tile sublabel>February 22, 2016</q-item-tile> -->
                  </q-item-main>
                  <q-item-side right icon="info" color="amber" />
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </li>
        </ul>
      </form>
    </div>
    <div class="questionnaire-container">
      <form action="">
        <div class="form-rowdesc">
          <label for="quest">FORM BUILDER:</label>
          <input type="text" id="form builder">
        </div>
      </form>
    </div>
    <div class="next-container">
      <q-btn class="previous-button"
      label="Previous Page"
      icon="arrow_back"
      color="orange"
      @click="gotopageCriteria"
      >
      </q-btn>
      <q-btn class="next-button"
      label="Next Page"
      icon-right="arrow_forward"
      color="orange"
      @click="gotopageConsent"
      >
      </q-btn>
    </div>
  </q-page>
</template>

<style>
/* Flex*/
.flex-outer li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.flex-outer > li > label,
.flex-outer li p {
  flex: 1 0 120px;
  max-width: 220px;
}

.flex-outer > li > label + * {
  flex: 1 0 220px;
}

/* Spacing between*/
.flex-outer > li:not(:last-child) {
  margin-bottom: 20px;
}
/* Data Query*/
.data-query-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color:  rgba(38, 134, 138, 0.2);
}

.form-row {
  padding: 10px 0;
  height: 50px;
  display: flex;
}

.form-row label {
  padding-right: 190px;
}

.form-row input {
  flex: 1;
}

.form-rowdesc {
  padding: 10px 0;
  height: 250px;
  display: flex;
}

.form-rowdesc label {
  padding-right: 100px;
}

.form-rowdesc input {
  flex: 1;
}

/* Form Questionnaire Builder*/
.questionnaire-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color:  rgba(38, 134, 138, 0.2);
}
/*Next button*/
.next-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgba(60, 122, 141, 0.7);
}

.next-button {
  width: 25%;
  display: flex;
  margin-left: auto;
}

.previous-button {
  width: 25%;
  display: flex;
}

</style>

<script>
export default {
  data () {
    return {
      options: [
        {
          label: 'Steps',
          value: 'steps'
        },
        {
          label: 'Weight',
          value: 'weight'
        }
      ]
    }
  },
  methods: {
    gotopageCriteria () {
      this.$router.push('pageCriteria')
    },
    gotopageConsent () {
      this.$router.push('pageConsent')
    },
    showNotification () {
      this.$q.notify('Option selected')
    }
  }
}
</script>
