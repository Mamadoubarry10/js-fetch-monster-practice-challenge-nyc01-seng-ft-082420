document.addEventListener("DOMContentLoaded", () =>{
    const mainUrl = "http://localhost:3000/monsters/?_limit=50&_page="

    let pageNumber = 1
    const div = document.getElementById('monster-container')
    
    const renderMonsters = (monsters) => {
        monsters.forEach(monster => {
          renderMonster(monster)
        })
    }

    const frontButon = document.getElementById("forward")

    frontButon.addEventListener('click', function(e){
        pageNumber++
        getMonsters()
    })

    const backButon = document.getElementById("back")

    backButon.addEventListener('click', function(e){
        pageNumber--
        getMonsters()
    })

    

    const form = document.createElement('form')
    form.innerHTML = `
    <label>Name: </label>
    <input type="text" name="name">
    <br>
    <label>Age: </label>
    <input type="number" name="age">
    <br>
    <label>Description: </label>
    <input type="text" name="description">
    <br>
    <input type="submit" value="Add Monster">`

    div.insertAdjacentElement('beforebegin', form)
    
   const submitHandler = () =>{
     document.addEventListener('submit', e =>{
        e.preventDefault()
        const form = e.target

        const name = form.name.value
        const age = form.age.value
        const description = form.description.value

        const newmonster = {name: name, age: age, description: description}
        form.reset()

        const options = {
            method: "POST",
            headers:{    
            "content-type": "application/json",
            "accept": "application/json"
         },
          body: JSON.stringify(newmonster)
        }
        
        fetch('http://localhost:3000/monsters', options)
        .then(res => res.json())
        .then(monster => {
            renderMonster(monster)
       })
     })
    }
       

function renderMonster(monsterObj){
    
    const monsterLi = document.createElement('div')

    monsterLi.classList.add('monster')
    monsterLi.dataset.color = monsterObj.id
    

    monsterLi.innerHTML =`
    <h3>Name:${monsterObj.name}</h3>
    <h5>Age:${monsterObj.age}</h5>
    <p>Description:${monsterObj.description}</p>
    `
    const div = document.getElementById('monster-container')

    div.prepend(monsterLi)

 }



 const getMonsters = () =>{
   let url = mainUrl + pageNumber
   fetch(url)
  .then(res => res.json())
  .then(monster => renderMonsters(monster))
 }

 submitHandler()
 getMonsters()
})