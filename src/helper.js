

const storage = window.localStorage
let helper = {}

helper.ls = {
  set(name, value){
    value = JSON.stringify(value)
    storage.setItem(name, value)
  },
  get(name, defaultValue) {
    let value = storage.getItem(name, value)
    if (value === null || value == 'undefined' || value == '') {
      value = defaultValue
    } else {
      value = JSON.parse(value)
    }
    return value
  }
}

export default helper