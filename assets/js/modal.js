const modal = {}

const body = document.querySelector('body')

modal.show = (content) => {
  body.classList.add('bloqued')
  body.innerHTML += `
    <div id="overlay" onClick="modal.close()"></div>
    <div id="modal">
      ${content}
    </div>
  `
}

modal.close = () => {
  body.classList.remove('bloqued')
  document.getElementById('modal').remove()
  document.getElementById('overlay').remove()
}

