

export function initNavigate(router) {
  document.getElementById("btn").onclick = () => {
    const route = document.getElementById("route-to-navigate-to").value
    router.navigate(route)
  }
}