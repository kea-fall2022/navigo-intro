import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
  setActiveLink, adjustForMissingHash, loadTemplate, renderTemplate
} from "./utils.js"

import { initNavigate } from "./pages/navigate/navigate.js"
import { initUsers } from "./pages/users/users.js"
import { initFindUser } from "./pages/findUser/findUser.js"


window.addEventListener("load", async () => {
  const templateAbout = await loadTemplate("./pages/about/about.html")
  const templateUsers = await loadTemplate("./pages/users/users.html")
  const templateFindUser = await loadTemplate("./pages/findUser/findUser.html")
  const templateNavigate = await loadTemplate("./pages/navigate/navigate.html")
  adjustForMissingHash()


  const router = new Navigo("/", { hash: true });

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      "/": () => document.getElementById("content").innerHTML =
        `<h2>Home</h2>
      <p style='margin-top:2em'>
      This is the content of the Home Route
      </p>
     `,
      "/about": () => renderTemplate(templateAbout, "content"),
      "/users": () => {
        renderTemplate(templateUsers, "content")
        initUsers(router)
      },
      "/find-user": (match) => {
        renderTemplate(templateFindUser, "content")
        initFindUser(match)
      },
      "/navigate-programatically": () => {
        renderTemplate(templateNavigate, "content")
        initNavigate(router)
      },
      "/show-match": (match) => document.getElementById("content").innerHTML = `<pre>${JSON.stringify(match, null, 2)}</pre>`
    })
    .notFound(() => document.getElementById("content").innerText = "404 - No page for this route found")
    .resolve()
});


window.onerror = (e) => alert(e)