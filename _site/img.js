const images = document.querySelectorAll('img')

images.forEach((i) => i.addEventListener('click', handleClick))

function handleClick (event) {
  console.log(this)
  this.classList.toggle('big')
  event.preventDefault()
}

