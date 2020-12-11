export const getLocalTitle = {
  methods: {
    // Iterates through the study titles and returns the first with a non-empty string
    getFirstTitle (obj) {
      if (obj.en !== '') return obj.en
      else for (const key in obj) if (obj[key] !== '') return obj[key]
    }
  }
}
