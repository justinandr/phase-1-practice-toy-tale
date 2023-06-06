let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    data.forEach(element => {
      handleCard(element)

    })
  })

  document.querySelector('form.add-toy-form').addEventListener('submit', function(e){
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },

      body: JSON.stringify({
        'name': e.target.childNodes[3].value,
        'image': e.target.childNodes[7].value,
        'likes': 0
      })

    })
    .then(res => res.json)
    .then(data => handleCard(data))
  })

  
});

function handleCard(element){
  const container = document.getElementById('toy-collection')
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const button = document.createElement('button')

  div.classList.add('card')
  h2.innerText = element.name
  img.src = element.image
  img.classList.add('toy-avatar')
  p.innerText = element.likes
  button.classList.add('like-btn')
  button.id = element.id
  button.innerText = 'like'
  button.addEventListener('click', handleLike)

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  container.appendChild(div)
}

function handleLike(e){
  e.preventDefault()
  const id = e.srcElement.id.toString()
  const newNumberOfLikes = parseInt(e.target.previousSibling.innerText, 10) + 1
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'likes': `${newNumberOfLikes}`
    })
  })
  .then(res => res.json())
  .then(data => {
    e.target.previousSibling.innerText = data.likes
  })
}