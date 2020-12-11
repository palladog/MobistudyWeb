<template>
  <div>
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h5">Generalities</div>
        <div class="text-subtitle1">General information about the study.</div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Supported languages:
            </div>
            <div class="text-caption">
              Translations will have to be provided for each supported language.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-field
              :error="v.languages.$error"
              error-message="At least one language must be specified"
            >
              <q-checkbox
                v-model.trim="v.languages.$model"
                @blur="v.languages.$touch"
                @input="update()"
                val="en"
                label="English"
              />
              <q-checkbox
                v-model.trim="v.languages.$model"
                @blur="v.languages.$touch"
                @input="update()"
                val="sv"
                label="Swedish"
              />
            </q-field>
          </div>
        </div>
        <div class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Title:
            </div>
            <div class="text-caption">
              Short name of the study
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-input-multilang
              v-model.trim="v.title.$model"
              @blur="v.title.$touch"
              @input="update()"
              :languages="value.languages"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Short description:
            </div>
            <div class="text-caption">
              Describe the study in one brief sentence. This appears with the notification inviting the participant to check the study. Make it appealing!
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-input-multilang
              v-model.trim="v.shortDescription.$model"
              @blur="v.shortDescription.$touch"
              @input="update()"
              :languages="value.languages"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Long description:
            </div>
            <div class="text-caption">
              A longer description (few sentences) of the study, in layman terms. This is shown when the participant wants to know more about the study.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-input-multilang
              type="textarea"
              v-model.trim="v.longDescription.$model"
              @blur="v.longDescription.$touch"
              @input="update()"
              :languages="value.languages"
              required
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- Gen Info Tab: Principal Investigator Card -->
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h5"> Principal Investigator(s) </div>
        <div class="text-subtitle1"> Principal investigators of this study. </div>
      </q-card-section>
      <q-card-section>
        <div
          v-for="(pi, index) in v.principalInvestigators.$each.$iter"
          :key="index"
        >
          <div class="row">
            <div class="col-4 q-pt-lg">
              <div class="text-bold">
                Name:
              </div>
              <div class="text-caption">
                Principal Investigator name &amp; title.
              </div>
            </div>
            <div class="col q-pl-sm">
              <q-input
                type="text"
                hint="Same text for all languages"
                v-model.trim="pi.name.$model"
                @blur="pi.name.$touch"
                @input="update()"
                :error="pi.name.$error"
                error-message="Field is required."
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 q-pt-lg">
              <div class="text-bold">
                Contact:
              </div>
              <div class="text-caption">
                Contact details, like email, telephone and address.
              </div>
            </div>
            <div class="col q-pl-sm">
              <q-input
                type="textarea"
                autogrow
                hint="Same text for all languages"
                v-model.trim="pi.contact.$model"
                @blur="pi.contact.$touch"
                @input="update()"
                :error="pi.contact.$error"
                error-message="Field is required."
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 q-pt-lg">
              <div class="text-bold">
                Institution:
              </div>
              <div class="text-caption">
                Name of institution the PI belongs to. The institution must be also present in the list of Institutions below.
              </div>
            </div>
            <div class="col q-pl-sm">
              <q-input
                type="text"
                hint="Same text for all languages"
                v-model.trim="pi.institution.$model"
                @blur="pi.institution.$touch"
                @input="update()"
                :error="pi.institution.$error"
                error-message="Field is required."
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-btn
                v-show="index !=0"
                label="Remove PI"
                color="negative"
                icon="remove"
                @click="removeRowInvestigator(index)"
              />
            </div>
            <div class="col">
              <q-btn
                class="float-right"
                v-show="index == value.principalInvestigators.length-1"
                label="Add PI"
                color="primary"
                icon="add"
                @click="addRowInvestigator(index)"
              />
            </div>
          </div>
          <q-separator
            color="primary"
            spaced="xl"
            v-show="index != value.principalInvestigators.length-1"
          />
        </div>
      </q-card-section>
    </q-card>
    <!-- Gen Info Tab: Institutions Card -->
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h5">Institution(s)</div>
        <div class="text-subtitle1"> Involved institutions and data access rules. </div>
      </q-card-section>
      <q-card-section>
        <div
          v-for="(inst, index) in v.institutions.$each.$iter"
          :key="index"
        >
          <div class="row">
            <div class="col-4 q-pt-lg">
              <div class="text-bold">
                Name of the Institution:
              </div>
              <div class="text-caption">
                Full name of the involved instituion.
              </div>
            </div>
            <div class="col q-pl-sm">
              <q-input
                type="text"
                hint="Same text for all languages."
                v-model.trim="inst.name.$model"
                @blur="inst.name.$touch"
                @input="update()"
                :error="inst.name.$error"
                error-message="Field is required."
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 q-pt-lg">
              <div class="text-bold">
                Contact:
              </div>
              <div class="text-caption">
                Official contact details of the institution, like an email or and address.
              </div>
            </div>
            <div class="col q-pl-sm">
              <q-input
                type="textarea"
                autogrow
                hint="Same text for all languages."
                v-model.trim="inst.contact.$model"
                @blur="inst.contact.$touch"
                @input="update()"
                :error="inst.contact.$error"
                error-message="Field is required"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 q-pt-lg">
              <div class="text-bold">
                Data Access:
              </div>
              <div class="text-caption">
                Level of data access granted to this instituion.
              </div>
            </div>
            <div class="col q-pl-sm">
              <q-field
                class="q-mt-md"
                :error="inst.dataAccess.$error"
                error-message="The level of data access is required"
              >
                <q-radio
                  v-model.trim="inst.dataAccess.$model"
                  val="no access"
                  color="secondary"
                  label="No Access"
                  @input="update()"
                />
                <q-radio
                  v-model.trim="inst.dataAccess.$model"
                  val="anonymised"
                  color="secondary"
                  label="Anonymised"
                  @input="update()"
                  style="margin-left: 10px"
                />
                <q-radio
                  v-model.trim="inst.dataAccess.$model"
                  val="full"
                  color="secondary"
                  label="Full"
                  @input="update()"
                  style="margin-left: 10px"
                />
              </q-field>
            </div>
          </div>
          <div class="row">
            <div class="col-4 q-pt-lg">
              <div class="text-bold">
                Reason for Data Access:
              </div>
              <div class="text-caption">
                Provide a brief justification of why this level of data access has to be granted.
              </div>
            </div>
            <div class="col q-pl-sm">
              <q-input-multilang
                type="textarea"
                v-model.trim="inst.reasonForDataAccess.$model"
                @blur="inst.reasonForDataAccess.$touch"
                :readonly="inst.dataAccess.$model === 'no'"
                @input="update()"
                :languages="value.languages"
                required
              />
            </div>
          </div>
          <div class="row justify-center">
            <div class="col">
              <q-btn
                v-show="index !=0"
                label="Remove Institution"
                color="negative"
                icon="remove"
                @click="removeRowInstitution(index)"
              />
            </div>
            <div class="col">
              <q-btn
                class="float-right"
                v-show="index == value.institutions.length-1"
                label="Add Institution"
                color="primary"
                icon="add"
                @click="addRowInstitution(index)"
              />
            </div>
          </div>
          <q-separator v-show="index != value.institutions.length-1" />
        </div>
      </q-card-section>
    </q-card>
    <!-- Gen Info Tab: Date Card -->
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h5">Dates</div>
        <div class="text-subtitle1">The start and end dates of the study.</div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Start date:
            </div>
            <div class="text-caption">
              Date the study officially starts.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-input
              type="date"
              format="D-MMM-YYYY"
              v-model.trim="v.startDate.$model"
              @blur="v.startDate.$touch"
              @input="update()"
              :error="v.startDate.$error"
              error-message="Field is required."
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              End date:
            </div>
            <div class="text-caption">
              Date the study officially ends. No data collection is possible after this date.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-input
              type="date"
              format="D-MMM-YYYY"
              v-model.trim="v.endDate.$model"
              @blur="v.endDate.$touch"
              @input="update()"
              :error="v.endDate.$error"
              error-message="Field is required."
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import QInputMultilang from './QInputMultilang'

export default {
  name: 'StudyDesignGeneralities',
  props: ['value', 'v'],
  components: {
    QInputMultilang
  },
  methods: {
    update () {
      this.$emit('input', this.value)
    },
    addRowInvestigator (index) {
      // increment the id
      this.value.principalInvestigators.push({
        name: '',
        contact: '',
        institution: ''
      })
    },
    removeRowInvestigator (index) {
      this.value.principalInvestigators.splice(index, 1)
    },
    addRowInstitution (index) {
      // increment the id
      this.value.institutions.push({
        name: '',
        contact: '',
        dataAccess: '',
        reasonForDataAccess: {
          en: '',
          sv: ''
        }
      })
    },
    removeRowInstitution (index) {
      this.value.institutions.splice(index, 1)
    }
  }
}
</script>
