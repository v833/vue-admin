import store from '../store'

export function buttonPermission(permission) {
  const button = store.getters["buttonPermission"];
  return button.includes(permission)
}
