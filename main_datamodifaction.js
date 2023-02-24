const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
// Listen for form submit
myForm.addEventListener('submit', onSubmit);

// document.addEventListener('DOMContentLoaded',getData)
window.onload = getData

function onSubmit(e) {
  e.preventDefault();
  if(nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error')
    msg.innerHTML = 'Please enter all fields'
    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000)
  } else {
 
    let user = {
      name : nameInput.value,
      email : emailInput.value
    }
    axios.post("https://crudcrud.com/api/d87d98cd927d481296c478e7313193e1/users",user)
    .then(res =>showUser(res.data))
    .catch(err => {
        msg.classList.add('error')
        msg.innerHTML = err
        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000)
    })
    // localStorage.setItem("userDetails", JSON.stringify(user))
    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
    // li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
    // Append to ul
    // userList.appendChild(li);
    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
function showUser(user) {
     userList.innerHTML = userList.innerHTML + `<li id=${user.email}>${user.name}: ${user.email} 
    <button class="btn delete" onclick=deleteUser('${user.email}')>X</button>
    <button class="btn edit" onclick=editUserDetails('${user.email}','${user.name}')>Edit</button></li> `
    }

function getData() {
    // let keys = Object.keys(localStorage);
    // for (let key of keys) {
    //   let { name, email } = JSON.parse(localStorage.getItem(key))
    //   userList.innerHTML = userList.innerHTML + `<li id=${email}>${name}: ${email} 
    //   <button class="btn delete" onclick= deleteUser('${email}')>X</button>
    //   <button class="btn edit" onclick=editUserDetails('${email}','${name}')>Edit</button></li>`
    // }

  axios.get("https://crudcrud.com/api/0e8214dbe9f34c0c8927660bb2c53826/appointmentData")
  .then(res => {
    res.data.forEach(obj => showUser(obj))
  })
  .catch(err => {
      msg.classList.add('error')
      msg.innerHTML = err
      // Remove error after 3 seconds
      setTimeout(() => msg.remove(), 3000)
  })

  }

  function deleteUser(emailId) {
    localStorage.removeItem("userDetails" + emailId)
    const toDelete = document.getElementById(emailId);
    userList.removeChild(toDelete)
  
  }
  
  function editUserDetails(emailId, name) {
  
    emailInput.value = emailId;
    nameInput.value = name;
  
    deleteUser(emailId)
  }