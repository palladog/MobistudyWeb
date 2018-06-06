const Dictionary = {
  queryDisease: function (diseasename) {
    var diaseses = ['diabetes', 'heart failure']
    return diaseses.find(function (element) {
      return element.startsWith(diseasename)
    })
  }
}

export default Dictionary
