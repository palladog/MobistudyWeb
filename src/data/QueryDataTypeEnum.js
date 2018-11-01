export default {
  values: [ 'steps', 'weight' ],
  valueToString (v) {
    if (v === 'steps') return 'Steps'
    if (v === 'weight') return 'Weight'
  },
  stringToValue (s) {
    if (s === 'Steps') return 'steps'
    if (s === 'Weight') return 'weight'
  }
}
