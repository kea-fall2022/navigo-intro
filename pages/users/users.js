const URL = "https://jsonplaceholder.typicode.com/users/"
import { encode } from "../../utils.js"

let users = []
let router;

export function initUsers(navigoRouter) {
  document.getElementById("btn-get-all").onclick = getAllUsers
  document.getElementById("tbl-body").onclick = showUserDetails
  getAllUsers()
  router = navigoRouter
}

export async function getAllUsers() {
  try {
    const usersFromServer = await fetch(URL).then(res => res.json())
    showAllData(usersFromServer)
    users = usersFromServer //Set the "private" variable in this module
  }
  catch (err) {
    console.error("UPPPPPS: " + err)
  }
}

function showAllData(data) {
  //DONT FORGET TO ENCODE WHEN YOU DO THIS FOR REAL
  const tableRowsArray = data.map(user => `
  <tr>                                
    <td>${user.id} </td>              
    <td>${user.name} </td>                     
    <td>${user.address.street} </td>  
    <td>${user.address.city} </td>
    <td>
    <!--See https://getbootstrap.com/docs/5.0/components/modal/ for an explanation of the classes used below -->
    <button id="${user.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button> 
   
    <button id="${user.id}-column-id" type="button"  class="other-page btn btn-sm btn-secondary">Details-2</button> </td>      
  </tr>`)

  const tableRowsString = tableRowsArray.join("\n")
  document.getElementById("tbl-body").innerHTML = tableRowsString
}

async function showUserDetails(evt) {
  const target = evt.target
  if (!target.id.includes("-column-id")) {
    return
  }
  const id = target.id.replace("-column-id", "")
  if (target.classList.contains("other-page")) {
    router.navigate("find-user?id=" + id)
  }
  else {
    document.getElementById("exampleModalLabel").innerText = "Details for userId: " + id
    const user = await fetch(URL + id).then(res => res.json())
    document.getElementById("user-content").innerText = JSON.stringify(user, null, 2)
  }
}
