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
}
 // Clear fields
 nameInput.value = '';
 emailInput.value = '';
 }

 function showUser(user) {
    userList.innerHTML = userList.innerHTML + `<li id=${user._id}>${user.name}: ${user.email} 
   <button class="btn delete" onclick=deleteUser('${user._id}')>X</button>
   <button class="btn edit" onclick="editUserDetails('${user._id}','${user.name}','${user.email}')">Edit</button></li> `
   }

   function getData() {
    axios.get("https://crudcrud.com/api/d87d98cd927d481296c478e7313193e1/users")
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
    
    function deleteUser(id) {
      
      axios.delete(`https://crudcrud.com/api/d87d98cd927d481296c478e7313193e1/users/${id}`)
      .then(() => {
        userList.removeChild(document.getElementById(id))
      })
      .catch(err => {
          msg.classList.add('error')
          msg.innerHTML = err
          // Remove error after 3 seconds
          setTimeout(() => msg.remove(), 3000)
      })
    }

    function editUserDetails(id, name, email) {
        // console.log(id,email,name)
        document.querySelector('#email').value = email
        document.querySelector('#name').value = name
    
        deleteUser(id)
      }