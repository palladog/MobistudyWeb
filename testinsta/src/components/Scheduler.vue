<template>
    <q-card style="width: 400px; max-width: 90vw;">
      <q-card-title>
        Scheduler
      <span slot="subtitle">Please select when the event will be scheduled</span>
      </q-card-title>
      <q-card-separator />
      <!-- Option Repeat Types -->
      <q-card-main>
        <div style="width: 200px; max-width: 90vw;">
          <div id="wrapperAll">
            <!-- Validity  -->
            <div id="divValidityDays" class="q-mb-md">
              <q-field label="Validity" />
              <q-field label="From:" helper="Enter the number of days from the start">
              <q-input v-model="startTask" type="number" />
              </q-field>
              <q-field label="To:" helper="Enter the number of days from the start">
              <q-input v-model="endTask" type="number" />
              </q-field>
            </div>
            <q-card-separator />
            <!-- repeatTypeChosen() -->
            <div id="divRepeatType" class="q-mb-sm q-mt-md" v-show="showDivRepeatType">
              <q-select
              v-model="selectOptionRepeatType"
              :options="optionRepeatType"
              @input="repeatTypeChosen(selectOptionRepeatType)"
              />
            </div>
            <!-- Interval Daily -->
            <div id="divIntervalDaily" class="q-mb-sm" v-show="showDivIntervalDaily">
              <q-select
              v-model="selectOptionIntervalDaily"
              @input="buildRule()"
              :options="optionIntervalDaily"
              />
            </div>
            <!-- Repeat Weeklyday -->
            <div id="divRepeatWeeklyday" class="q-mb-sm" v-show="showDivRepeatWeeklyday">
              <q-select
              v-model="selectOptionRepeatWeeklyday"
              @input="buildRule()"
              :options="optionRepeatWeeklyday"
              />
            </div>
            <!-- Interval Monthly-->
            <div id="divIntervalMonthly" class="q-mb-sm" v-show="showDivIntervalMonthly">
              <q-select
              v-model="selectOptionIntervalMonthly"
              @input="buildRule()"
              :options="optionIntervalMonthly"
              />
            </div>
            <!-- Interval Weekly-->
            <div id="divIntervalWeekly" class="q-mb-sm" v-show="showDivIntervalWeekly">
              <q-select
              v-model="selectOptionIntervalWeekly"
              @input="buildRule()"
              :options="optionIntervalWeekly"
              />
            </div>
            <!-- Interval yearly-->
            <div id="divIntervalYearly" class="q-mb-sm"  v-show="showDivIntervalYearly">
              <q-select
              v-model="selectOptionIntervalYearly"
              @input="buildRule()"
              :options="optionIntervalYearly"
              />
            </div>
            <!-- Repeat yearly_month -->
            <div id="divRepeatYearlyMonth" class="q-mb-sm" v-show="showDivRepeatYearlyMonth">
              <q-select
              v-model="selectOptionRepeatYearlyMonth"
              @input="buildRule()"
              :options="optionRepeatYearlyMonth"
              />
            </div>
            <!-- Repeat yearly_monthdate -->
            <div id="divRepeatYearlyMonthdate" class="q-mb-sm" v-show="showDivRepeatYearlyMonthdate">
              <q-select
              v-model="selectOptionRepeatYearlyMonthdate"
              @input="buildRule()"
              :options="optionRepeatYearlyMonthdate"
              />
            </div>
            <!-- Repeat monthlyday -->
            <div id="divRrepeatMonthlyday" class="q-mb-sm" v-show="showDivRepeatMonthlyday">
              <q-select
              v-model="selectOptionRepeatMonthlyday"
              @input="buildRule()"
              :options="optionRepeatMonthlyday"
              />
            </div>
            <!-- Frequency Options-->
            <div class="q-mt-xl">
              <q-field
                  icon="vibration"
                  label="Frequency Options"
                  helper="Select one of the options"
                >
              <q-option-group
                type="radio"
                color="secondary"
                v-model="group"
                @input="checkSchedulerOption"
                :options="[
                  { label: 'None', value: 'valNone', color: 'black' },
                  { label: 'Until', value: 'valUntil', color: 'black' },
                  { label: 'Occurrence(s)', value: 'valOccur', color: 'black' }
                ]"
              />
              </q-field>
              <br>
              <br>
              <div id="divFreqUntil" v-show="showDivFreqUntil">
                  <q-input v-model="inputFreqUntilDate" type="number" @input="buildRule()" placeholder="Please enter the number of days." clearable />
              </div>
              <div id="divFreqOccur" v-show="showDivFreqOccur">
                <q-input v-model="inputFreqOccurrences" type="text" @input="buildRule()" placeholder="# of occurrences" />
              </div>
            </div>
            <!-- Always Available -->
            <div id="divAlwaysAvailable" class="q-mt-md">
              <q-checkbox v-model="alwaysAvailable" color="black" label="Please check to send data in the background."/>
            </div>
        </div>
        </div>
      </q-card-main>
      <q-field label="RULE Generated">
        <q-input v-model="ruleGen" type="text" placeholder="rule generated" />
      </q-field>
    </q-card>
</template>

<style>
</style>

<script>

export default {
  data () {
    return {
      ruleGen: '',
      group: '',
      inputFreqOccurrences: '',
      inputFreqUntilDate: '',
      startTask: '',
      endTask: '',
      // Define divs
      showDivRepeatType: true,
      showDivIntervalDaily: true,
      showDivRepeatWeeklyday: false,
      showDivIntervalMonthly: false,
      showDivIntervalWeekly: false,
      showDivIntervalYearly: false,
      showDivRepeatYearlyMonth: false,
      showDivRepeatYearlyMonthdate: false,
      showDivRepeatMonthlyday: false,
      showDivFreqOccur: false,
      showDivFreqUntil: false,
      alwaysAvailable: false,
      // OPTION REPEAT TYPE
      selectOptionRepeatType: 'd',
      optionRepeatType: [
        {
          label: 'Daily',
          value: 'd'
        },
        {
          label: 'Weekly',
          value: 'w'
        },
        {
          label: 'Monthly by day',
          value: 'mday'
        },
        {
          label: 'Monthly by date',
          value: 'mdate'
        },
        {
          label: 'Yearly by day',
          value: 'yday'
        },
        {
          label: 'Yearly by date',
          value: 'ydate'
        }
      ],
      // DAILY
      selectOptionIntervalDaily: '1',
      optionIntervalDaily: [
        {
          label: 'Every day',
          value: '1'
        },
        {
          label: 'Every other day',
          value: '2'
        },
        {
          label: 'Every 3rd day',
          value: '3'
        },
        {
          label: 'Every 4th day',
          value: '4'
        },
        {
          label: 'Every 5th day',
          value: '5'
        },
        {
          label: 'Every 6th day',
          value: '6'
        },
        {
          label: 'Every 7th day',
          value: '7'
        },
        {
          label: 'Every 8th day',
          value: '8'
        },
        {
          label: 'Every 9th day',
          value: '9'
        },
        {
          label: 'Every 10th day',
          value: '10'
        },
        {
          label: 'Every 11th day',
          value: '11'
        },
        {
          label: 'Every 12th day',
          value: '12'
        },
        {
          label: 'Every 13th day',
          value: '13'
        },
        {
          label: 'Every 14th day',
          value: '14'
        },
        {
          label: 'Every 15th day',
          value: '15'
        },
        {
          label: 'Every 16th day',
          value: '16'
        },
        {
          label: 'Every 17th day',
          value: '17'
        },
        {
          label: 'Every 18th day',
          value: '18'
        },
        {
          label: 'Every 19th day',
          value: '19'
        },
        {
          label: 'Every 20th day',
          value: '20'
        },
        {
          label: 'Every 21th day',
          value: '21'
        },
        {
          label: 'Every 22th day',
          value: '22'
        },
        {
          label: 'Every 23th day',
          value: '23'
        },
        {
          label: 'Every 24th day',
          value: '24'
        },
        {
          label: 'Every 25th day',
          value: '25'
        },
        {
          label: 'Every 26th day',
          value: '26'
        },
        {
          label: 'Every 27th day',
          value: '27'
        },
        {
          label: 'Every 28th day',
          value: '28'
        },
        {
          label: 'Every 29th day',
          value: '29'
        },
        {
          label: 'Every 30th day',
          value: '30'
        }
      ],
      // REPEAT WEEKLYDAY
      selectOptionRepeatWeeklyday: 'SU',
      optionRepeatWeeklyday: [
        {
          label: 'Sunday',
          value: 'SU'
        },
        {
          label: 'Monday',
          value: 'MO'
        },
        {
          label: 'Tuesday',
          value: 'TU'
        },
        {
          label: 'Wednesday',
          value: 'WE'
        },
        {
          label: 'Thursday',
          value: 'TH'
        },
        {
          label: 'Friday',
          value: 'FR'
        },
        {
          label: 'Saturday',
          value: 'SA'
        }
      ],
      // INTERVAL MONTHLY
      selectOptionIntervalMonthly: '1',
      optionIntervalMonthly: [
        {
          label: 'Every month',
          value: '1'
        },
        {
          label: 'Every other month',
          value: '2'
        },
        {
          label: 'Every 3rd month',
          value: '3'
        },
        {
          label: 'Every 4th month',
          value: '4'
        },
        {
          label: 'Every 5th month',
          value: '5'
        },
        {
          label: 'Every 6th month',
          value: '6'
        },
        {
          label: 'Every 7th month',
          value: '7'
        },
        {
          label: 'Every 8th month',
          value: '8'
        },
        {
          label: 'Every 9th month',
          value: '9'
        },
        {
          label: 'Every 10th month',
          value: '10'
        },
        {
          label: 'Every 11th month',
          value: '11'
        },
        {
          label: 'Every 12th month',
          value: '12'
        },
        {
          label: 'Every 18th month',
          value: '18'
        },
        {
          label: 'Every 24th month',
          value: '24'
        },
        {
          label: 'Every 36th month',
          value: '36'
        },
        {
          label: 'Every 48th month',
          value: '48'
        }
      ],
      // INTERVAL WEEKLY
      selectOptionIntervalWeekly: '1',
      optionIntervalWeekly: [
        {
          label: 'Every week',
          value: '1'
        },
        {
          label: 'Every other week',
          value: '2'
        },
        {
          label: 'Every 3rd week',
          value: '3'
        },
        {
          label: 'Every 4th week',
          value: '4'
        },
        {
          label: 'Every 5th week',
          value: '5'
        },
        {
          label: 'Every 6th week',
          value: '6'
        },
        {
          label: 'Every 7th week',
          value: '7'
        },
        {
          label: 'Every 8th week',
          value: '8'
        },
        {
          label: 'Every 9th week',
          value: '9'
        },
        {
          label: 'Every 10th week',
          value: '10'
        },
        {
          label: 'Every 11th week',
          value: '11'
        },
        {
          label: 'Every 12th week',
          value: '12'
        },
        {
          label: 'Every 13th week',
          value: '13'
        },
        {
          label: 'Every 14th week',
          value: '14'
        },
        {
          label: 'Every 15th week',
          value: '15'
        },
        {
          label: 'Every 16th week',
          value: '16'
        },
        {
          label: 'Every 17th week',
          value: '17'
        },
        {
          label: 'Every 18th week',
          value: '18'
        },
        {
          label: 'Every 19th week',
          value: '19'
        },
        {
          label: 'Every 20th week',
          value: '20'
        },
        {
          label: 'Every 21th week',
          value: '21'
        },
        {
          label: 'Every 22th week',
          value: '22'
        },
        {
          label: 'Every 23th week',
          value: '23'
        },
        {
          label: 'Every 24th week',
          value: '24'
        },
        {
          label: 'Every 25th week',
          value: '25'
        },
        {
          label: 'Every 26th week',
          value: '26'
        }
      ],
      // INTERVAL YEARLY
      selectOptionIntervalYearly: '1',
      optionIntervalYearly: [
        {
          label: 'Every year',
          value: '1'
        },
        {
          label: 'Every other year',
          value: '2'
        },
        {
          label: 'Every 3rd year',
          value: '3'
        },
        {
          label: 'Every 4th year',
          value: '4'
        },
        {
          label: 'Every 5th year',
          value: '5'
        },
        {
          label: 'Every 6th year',
          value: '6'
        },
        {
          label: 'Every 7th year',
          value: '7'
        },
        {
          label: 'Every 8th year',
          value: '8'
        },
        {
          label: 'Every 9th year',
          value: '9'
        },
        {
          label: 'Every 10th year',
          value: '10'
        }
      ],
      // REPEAT YEARLY MONTH
      selectOptionRepeatYearlyMonth: '0',
      optionRepeatYearlyMonth: [
        {
          label: 'Use today"s" month',
          value: '0'
        },
        {
          label: 'January',
          value: '1'
        },
        {
          label: 'February',
          value: '2'
        },
        {
          label: 'March',
          value: '3'
        },
        {
          label: 'April',
          value: '4'
        },
        {
          label: 'May',
          value: '5'
        },
        {
          label: 'June',
          value: '6'
        },
        {
          label: 'July',
          value: '7'
        },
        {
          label: 'August',
          value: '8'
        },
        {
          label: 'September',
          value: '9'
        },
        {
          label: 'October',
          value: '10'
        },
        {
          label: 'November',
          value: '11'
        },
        {
          label: 'December',
          value: '12'
        }
      ],
      // REPEAT YEARLY MONTHDATE
      selectOptionRepeatYearlyMonthdate: '0',
      optionRepeatYearlyMonthdate: [
        {
          label: 'Use todays date',
          value: '0'
        },
        {
          label: '1st day',
          value: '1'
        },
        {
          label: '2nd day',
          value: '2'
        },
        {
          label: '3rd day',
          value: '3'
        },
        {
          label: '4th day',
          value: '4'
        },
        {
          label: '5th day',
          value: '5'
        },
        {
          label: '6th day',
          value: '6'
        },
        {
          label: '7th day',
          value: '7'
        },
        {
          label: '8th day',
          value: '8'
        },
        {
          label: '9th day',
          value: '9'
        },
        {
          label: '10th day',
          value: '10'
        },
        {
          label: '11th day',
          value: '11'
        },
        {
          label: '12th day',
          value: '12'
        },
        {
          label: '13th day',
          value: '13'
        },
        {
          label: '14th day',
          value: '14'
        },
        {
          label: '15th day',
          value: '15'
        },
        {
          label: '16th day',
          value: '16'
        },
        {
          label: '17th day',
          value: '17'
        },
        {
          label: '18th day',
          value: '18'
        },
        {
          label: '19th day',
          value: '19'
        },
        {
          label: '20th day',
          value: '20'
        },
        {
          label: '21st day',
          value: '21'
        },
        {
          label: '22nd day',
          value: '22'
        },
        {
          label: '23rd day',
          value: '23'
        },
        {
          label: '24th day',
          value: '24'
        },
        {
          label: '25th day',
          value: '25'
        },
        {
          label: '26th day',
          value: '26'
        },
        {
          label: '27th day',
          value: '27'
        },
        {
          label: '28th day',
          value: '28'
        },
        {
          label: '29th day',
          value: '29'
        },
        {
          label: '30th day',
          value: '30'
        },
        {
          label: '31st day',
          value: '31'
        }
      ],
      //  REPEAT MONTHLYDAY
      selectOptionRepeatMonthlyday: '1SU',
      optionRepeatMonthlyday: [
        {
          label: 'First Sunday',
          value: '1SU'
        },
        {
          label: 'First Monday',
          value: '1MO'
        },
        {
          label: 'First Tuesday',
          value: '1TU'
        },
        {
          label: 'First Wednesday',
          value: '1WE'
        },
        {
          label: 'First Thursday',
          value: '1TH'
        },
        {
          label: 'First Friday',
          value: '1FR'
        },
        {
          label: 'First Saturday',
          value: '1SA'
        },
        {
          label: 'Second Sunday',
          value: '2SU'
        },
        {
          label: 'Second Monday',
          value: '2MO'
        },
        {
          label: 'Second Tuesday',
          value: '2TU'
        },
        {
          label: 'Second Wednesday',
          value: '2WE'
        },
        {
          label: 'Second Thursday',
          value: '2TH'
        },
        {
          label: 'Second Friday',
          value: '2FR'
        },
        {
          label: 'Second Saturday',
          value: '2SA'
        },
        {
          label: 'Third Sunday',
          value: '3SU'
        },
        {
          label: 'Third Monday',
          value: '3MO'
        },
        {
          label: 'Third Tuesday',
          value: '3TU'
        },
        {
          label: 'Third Wednesday',
          value: '3WE'
        },
        {
          label: 'Third Thursday',
          value: '3TH'
        },
        {
          label: 'Third Friday',
          value: '3FR'
        },
        {
          label: 'Third Saturday',
          value: '3SA'
        },
        {
          label: 'Fourth Sunday',
          value: '4SU'
        },
        {
          label: 'Fourth Monday',
          value: '4MO'
        },
        {
          label: 'Fourth Tuesday',
          value: '4TU'
        },
        {
          label: 'Fourth Wednesday',
          value: '4WE'
        },
        {
          label: 'Fourth Thursday',
          value: '4TH'
        },
        {
          label: 'Fourth Friday',
          value: '4FR'
        },
        {
          label: 'Fourth Saturday',
          value: '4SA'
        },
        {
          label: 'Fifth Sunday',
          value: '5SU'
        },
        {
          label: 'Fifth Monday',
          value: '5MO'
        },
        {
          label: 'Fifth Tuesday',
          value: '5TU'
        },
        {
          label: 'Fifth Wednesday',
          value: '5WE'
        },
        {
          label: 'Fifth Thursday',
          value: '5TH'
        },
        {
          label: 'Fifth Friday',
          value: '5FR'
        },
        {
          label: 'Fifth Saturday',
          value: '5SA'
        },
        {
          label: 'Last Sunday',
          value: '-1SU'
        },
        {
          label: 'Last Monday',
          value: '-1MO'
        },
        {
          label: 'Last Tuesday',
          value: '-1TU'
        },
        {
          label: 'Last Wednesday',
          value: '-1WE'
        },
        {
          label: 'Last Thursday',
          value: '-1TH'
        },
        {
          label: 'Last Friday',
          value: '-1FR'
        },
        {
          label: 'Last Saturday',
          value: '-1SA'
        }
      ]
    }
  },
  methods: {
    buildRule () {
      // Check for repeat type. Create Freq/Interval into rule generated
      var repeatType = this.selectOptionRepeatType
      var intervalDaily = this.selectOptionIntervalDaily
      var intervalWeekly = this.selectOptionIntervalWeekly
      var intervalMonthly = this.selectOptionIntervalMonthly
      var intervalYearly = this.selectOptionIntervalYearly

      var repeatWeeklyDay = this.selectOptionRepeatWeeklyday
      var repeatMonthlyDate = this.selectOptionRepeatYearlyMonthdate
      var repeatMonthlyDay = this.selectOptionRepeatMonthlyday
      var repeatYearlyMonth = this.selectOptionRepeatYearlyMonth

      var currDate = new Date()
      // User has selected today's month
      if (repeatYearlyMonth === '0') {
        repeatYearlyMonth = ('0' + (currDate.getMonth() + 1)).slice(-2)
      }
      // User has selected today's date
      if (repeatMonthlyDate === '0') {
        repeatMonthlyDate = ('0' + currDate.getDate()).slice(-2)
      }
      // For different repeat Types
      switch (repeatType) {
        case 'd':
          this.ruleGen = 'FREQ=DAILY;INTERVAL=' + intervalDaily
          break
        case 'w':
          this.ruleGen = 'FREQ=WEEKLY;INTERVAL=' + intervalWeekly + ';BYDAY=' + repeatWeeklyDay
          break
        // monthly by date
        case 'mdate':
          this.ruleGen = 'FREQ=MONTHLY;INTERVAL=' + intervalMonthly + ';BYMONTHDAY=' + repeatMonthlyDate
          break
        // monthly by day
        case 'mday':
          this.ruleGen = 'FREQ=MONTHLY;INTERVAL=' + intervalMonthly + ';BYDAY=' + repeatMonthlyDay
          break
        case 'ydate':
          this.ruleGen = 'FREQ=YEARLY;INTERVAL=' + intervalYearly + ';BYMONTH=' + repeatYearlyMonth + ';BYMONTHDAY=' + repeatMonthlyDate
          break
        case 'yday':
          this.ruleGen = 'FREQ=YEARLY;INTERVAL=' + intervalYearly + ';BYMONTH=' + repeatYearlyMonth + ';BYDAY=' + repeatMonthlyDay
          break
      }
      // For different frequency Types
      var freqType = this.group
      switch (freqType) {
        case 'valOccur':
          if (this.inputFreqOccurrences > 0) {
            this.ruleGen = this.ruleGen + ';COUNT=' + this.inputFreqOccurrences
          }
          break
        case 'valUntil':
          if (this.inputFreqUntilDate > 0) {
            this.ruleGen = this.ruleGen + ';UNTIL=' + this.inputFreqUntilDate
          }
          break
        case 'valNone':
          this.ruleGen = this.ruleGen
          break
      }
    },
    repeatTypeChosen (selectOptionRepeatType) {
      if (this.selectOptionRepeatType === 'd') {
        // if the selected option type is d (i.e daily), show only interval daily, hide others
        this.showDivIntervalDaily = true
        this.showDivIntervalWeekly = false
        this.showDivRepeatWeeklyday = false
        this.showDivIntervalMonthly = false
        this.showDivRepeatMonthlyday = false
        this.showDivRepeatYearlyMonthdate = false
        this.showDivIntervalYearly = false
        this.showDivRepeatYearlyMonth = false
      } else if (this.selectOptionRepeatType === 'w') {
        // if the selected option type is w (i.e weekly)
        this.showDivIntervalDaily = false
        this.showDivIntervalWeekly = true
        this.showDivRepeatWeeklyday = true
        this.showDivIntervalMonthly = false
        this.showDivRepeatMonthlyday = false
        this.showDivRepeatYearlyMonthdate = false
        this.showDivIntervalYearly = false
        this.showDivRepeatYearlyMonth = false
      } else if (this.selectOptionRepeatType === 'mday') {
        // if the selected option type is mday (i.e monthly by day)
        this.showDivIntervalDaily = false
        this.showDivIntervalWeekly = false
        this.showDivRepeatWeeklyday = false
        this.showDivIntervalMonthly = true
        this.showDivRepeatMonthlyday = true
        this.showDivRepeatYearlyMonthdate = false
        this.showDivIntervalYearly = false
        this.showDivRepeatYearlyMonth = false
      } else if (this.selectOptionRepeatType === 'mdate') {
        // if the selected option type is mdate (i.e monthly by date)
        this.showDivIntervalDaily = false
        this.showDivIntervalWeekly = false
        this.showDivRepeatWeeklyday = false
        this.showDivIntervalMonthly = true
        this.showDivRepeatMonthlyday = false
        this.showDivRepeatYearlyMonthdate = true
        this.showDivIntervalYearly = false
        this.showDivRepeatYearlyMonth = false
      } else if (this.selectOptionRepeatType === 'yday') {
        // if the selected option type is yday (i.e Yearly by day)
        this.showDivIntervalDaily = false
        this.showDivIntervalWeekly = false
        this.showDivRepeatWeeklyday = false
        this.showDivIntervalMonthly = false
        this.showDivRepeatMonthlyday = false
        this.showDivRepeatYearlyMonthdate = false
        this.showDivIntervalYearly = true
        this.showDivRepeatYearlyMonth = true
      } else if (this.selectOptionRepeatType === 'ydate') {
        // if the selected option type is ydate (i.e Yearly by date)
        this.showDivIntervalDaily = false
        this.showDivIntervalWeekly = false
        this.showDivRepeatWeeklyday = false
        this.showDivIntervalMonthly = false
        this.showDivRepeatMonthlyday = false
        this.showDivRepeatYearlyMonthdate = true
        this.showDivIntervalYearly = true
        this.showDivRepeatYearlyMonth = true
      }
      this.buildRule()
    },
    checkSchedulerOption (value) {
      if (value === 'valUntil') {
        // Show Date Until and HIDE Occurrences
        this.showDivFreqUntil = true
        this.showDivFreqOccur = false
        this.buildRule()
      } else if (value === 'valOccur') {
        // HIDE Date Until and SHOW Occurrences
        this.showDivFreqUntil = false
        this.showDivFreqOccur = true
        this.buildRule()
      } else if (value === 'valNone') {
        // HIDE Both Date Until and Occurrences
        this.showDivFreqUntil = false
        this.showDivFreqOccur = false
        this.inputFreqOccurrences = ''
        this.inputFreqUntilDate = ''
        this.buildRule()
      }
    }
  }
}
</script>
