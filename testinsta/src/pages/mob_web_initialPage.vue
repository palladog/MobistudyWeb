<template>
  <q-page>
      <q-tabs color="secondary" glossy align="justify">
        <q-tab slot="title" default name="generalities" icon="subject" label="Generalities" />
        <q-tab slot="title" name="criteria" icon="fingerprint" label="Inclusion Criteria" />
        <q-tab slot="title" name="tasks" icon="list" label="Tasks"/>
        <q-tab slot="title" name="consent" icon="verified_user" label="Consent"/>
        <!-- General Tab -->
        <q-tab-pane name="generalities">Gen tab
          <!-- General Information Tab Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Generalities
              <span slot="subtitle">General information about the study</span>
            </q-card-title>
            <q-card-main>
              <q-field label="Title" helper="Short name of the study">
                <q-input v-model="text" clearable />
              </q-field>
              <q-field label="Description" helper="Layman's description of the study">
                <q-input v-model="area" type="textarea" rows="7" clearable />
              </q-field>
            </q-card-main>
          </q-card>
          <!-- Gen Info Tab: Principal Investigator Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
             <q-card-title>Principal Investigator(s)
              <span slot="subtitle">Information concerning the principal investigators</span>
            </q-card-title>
            <q-card-main>
              <q-field label="Name & Title" helper="Principal Investigator Name/Title">
                <q-input v-model="text" clearable />
              </q-field>
              <q-field label="Contact" helper="Contact Details, may include address">
                <q-input v-model="text" clearable />
              </q-field>
              <q-field label="Institution" helper="Name of Institution involved in study">
                <q-input v-model="text" clearable />
              </q-field>
            </q-card-main>
          </q-card>
          <!-- Gen Info Tab: Institutions Card To implement lists with button -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-main>
            </q-card-main>
          </q-card>
          <!-- Gen Info Tab: Date Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Dates Of Study
              <span slot="subtitle">The Start and End Dates of the study</span>
            </q-card-title>
            <q-card-main>
              <div>
                <div>
                  <div class="row gutter-lg">
                    <div class="col-xs-4 col-md-4">
                        <q-field label="Start Date" />
                        </div>
                        <div class="col-xs-4 col-md-4">
                          <q-datetime class="q-ml-xl q-mb-lg" v-model="dateStart" type="date" format="D-MMM-YYYY" clearable />
                        </div>
                    </div>
                  </div>
              </div>
              <div>
                <div>
                  <div class="row gutter-lg">
                    <div class="col-xs-4 col-md-4">
                        <q-field label="End Date" />
                        </div>
                        <div class="col-xs-4 col-md-4">
                          <q-datetime class="q-ml-xl" v-model="dateEnd" type="date" format="D-MMM-YYYY" clearable />
                        </div>
                    </div>
                  </div>
              </div>
            </q-card-main>
          </q-card>
        </q-tab-pane>
        <!-- Criteria Tab -->
        <q-tab-pane name="criteria">Crit tab
          <!-- Inclusion Criteria Tab Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Inclusion Criteria
              <span slot="subtitle">Criteria to filter paritcipants in the study</span>
            </q-card-title>
            <q-card-main>
              <div>
                <div>
                <!-- Age Range & Sex -->
                  <div class="row gutter-lg">
                    <div class="col-xs-4 col-md-4">
                        <q-field label="Age Range"/>
                    </div>
                    <div class="col-xs-4 col-md-4">
                        <q-input v-model="ageMin" type="number" placeholder="Min Age1" clearable/>
                    </div>
                    <div class="col-xs-4 col-md-4">
                        <q-input v-model="ageMin" type="number" placeholder="Max Age1" clearable/>
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Sex" />
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-checkbox class="q-mr-lg" v-model="checkArray" label="M" color="secondary" val="one" />
                      <q-checkbox class="q-mr-lg" v-model="checkArray" label="F" val="two" color="secondary" />
                      <q-checkbox v-model="checkArray" label="OTHER" val="three" color="secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-main>
          </q-card>
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-main>
              <div>
                <div>
                  <!-- Disease, Lifestyle and Meds -->
                  <div class="row gutter-lg">
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Disease Choice" />
                    </div>
                    <div class="col-xs-4 col-md-6">
                      <q-input type="text" id="disease-form" placeholder="Disease" />
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Lifestyle" />
                    </div>
                    <div class="col-xs-4 col-md-6">
                      <q-radio v-model="radio_1" val="active" color="secondary" label="Active" />
                      <q-radio v-model="radio_1" val="not active" color="amber" label="Not Active" style="margin-left: 10px" />
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Meds" />
                    </div>
                    <div class="col-xs-4 col-md-6">
                      <q-input type="text" id="meds-form" placeholder="Meds" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-main>
          </q-card>
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-main>
              <div>
                <div>
                  <!-- Custom Criteria Questions -->
                  <div class="row gutter-lg">
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Custom Criteria:" />
                    </div>
                    <div class="col-xs-4 col-md-6">
                      <q-input type="text" id="disease-form" placeholder="Question Example:" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </q-tab-pane>
        <!-- Tasks Tab -->
        <q-tab-pane name="tasks">Tasks tab
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Tasks
            </q-card-title>
            <q-card-main>
            </q-card-main>
          </q-card>
        </q-tab-pane>
        <!-- Consent Tab -->
        <q-tab-pane name="consent">Consent tab
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>
              Consent
              <span slot="subtitle">Consent form that is viewed by participant</span>
            </q-card-title>
            <!-- Consent Tab: Invitation Message Card -->
            <q-card-main>
              <q-field label="Invitation Message" helper="The invitation message sent for the study">
                <q-input v-model="area" readonly type="textarea" rows="7"/>
              </q-field>
              <q-field label="Lay Description" helper="Layman's description of the study">
                <q-input v-model="area" readonly type="textarea" rows="7"/>
              </q-field>
              <p class="caption">Consent Question:</p>
              <q-checkbox v-model="check1" color="positive" label="Dynamic" left-label />
            </q-card-main>
          </q-card>
          <!-- Consent Tab: Privacy Policy Card -->
          <q-card class="bg-amber-3 q-ma-xl">
            <q-card-title>
              Privacy Policy
              <span slot="subtitle">Privacy form that is viewed by participant.</span>
            </q-card-title>
            <q-card-main>
              <q-field label="Privacy Message" helper="This the privacy policy for the study. It includes...">
                <q-input v-model="area" readonly type="textarea" rows="7"/>
              </q-field>
            </q-card-main>
          </q-card>
        </q-tab-pane>
      </q-tabs>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      ageMin: null,
      ageMax: null,
      checkArray: ['one'],
      dateStart: null,
      dateEnd: null,
      radio_1: 'Active'
    }
  }
}
</script>

<style>
</style>
