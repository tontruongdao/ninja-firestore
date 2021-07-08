const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form')

// Create element and render cafe

const renderCafe = (doc) => {
  let li = document.createElement('li');
  let name = document.createElement('span')
  let city = document.createElement('span')

  // Create element to delete data.
  let cross = document.createElement('div')

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data()?.name
  city.textContent = doc.data()?.city
  cross.textContent = 'x'

  li.appendChild(name)
  li.appendChild(city)
  li.appendChild(cross)

  cafeList.appendChild(li)

  // deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id')
    db.collection('cafes').doc(id).delete()
  })
}


// Getting Data
// db.collection("cafes").get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     renderCafe(doc)
//   })
// })


// Getting Specific Data
// db.collection("cafes").where('city', '<', 'n').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     renderCafe(doc)
//   })
// })

// Getting Data and Ordering Data

// db.collection("cafes").orderBy('name').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     renderCafe(doc)
//   })
// })


// Saving Data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('cafes').add({ 
    name: form.name.value,
    city: form.city.value
  })
  form.name.value = '';
  form.city.value = ''
})


// Real-time listener
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if(change.type == 'added') {
      renderCafe(change.doc);
    } else if (change.type == 'removed') {
      let li = cafeList.querySelector(`[data-id=${change.doc.id}]`)
      cafeList.removeChild(li)
    }
  })
})


// Code to Update Data

// This UPDATES the data
// db.collection('cafes').doc('X9lnbM7zilO2MsAHzYqV').update({
//   name: 'Wario Yard'
// })

// This OVERWRITES the data
// db.collection('cafes').doc('X9lnbM7zilO2MsAHzYqV').set({
//   name: 'Wario Yard'
// })