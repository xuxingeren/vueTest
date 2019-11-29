const name = 'xuxn-'

function LgetItem(key) {
  let value = localStorage.getItem(name + key);
  return JSON.parse(value)
}

function LsetItem(key, value) {
  localStorage.setItem(name + key, JSON.stringify(value))
}

function SgetItem(key) {
  let value = sessionStorage.getItem(name + key);
  return JSON.parse(value)
}

function SsetItem(key, value) {
  sessionStorage.setItem(name + key, JSON.stringify(value))
}
export {
  LgetItem,
  LsetItem,
  SgetItem,
  SsetItem
}