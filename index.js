const btnGenerate = document.querySelector('.password-btn')
const passwordField = document.querySelector('.password')
const inputLength = document.querySelector('.length-input')
const dialog = document.querySelector('.dialog')
const dialogMsg = document.querySelector('.dialog-msg')
const container = document.querySelector('.container')
const lengthSelectors = document.querySelectorAll('.password-length__selector')

const dialogMessages = {
  copy: 'Пароль скопирован',
  lengthError: 'Длина должна быть от 1 до 64',
}

let passwordLength = 16

function initLengthSelectors() {
  lengthSelectors.forEach((selector) => {
    selector.addEventListener('click', (e) => {
      const length = e.target.textContent
      changePasswordLength(length)
      inputLength.value = length
      generatePassword()
    })
  })
}

function activateDialog(msg) {
  dialog.classList.add('active')
  dialogMsg.textContent = msg
  setTimeout(() => {
    dialog.classList.remove('active')
  }, 4000)
}

function getRandomSymbol(arr) {
  const [min, max] = arr
  const randomArr = []
  let i = 0
  while (i < passwordLength) {
    const randomInt = parseInt(Math.random() * (max - min) + min)
    if (
      (randomInt > 90 && randomInt < 97) ||
      (randomInt > 57 && randomInt < 65)
    ) {
      continue
    }
    randomArr.push(String.fromCharCode(randomInt))
    i++
  }
  return randomArr.join('')
}

function copyPassword(e) {
  navigator.clipboard.writeText(`${e.currentTarget.textContent}`)
  activateDialog(dialogMessages.copy)
}

function changePasswordLength(number) {
  passwordLength = parseInt(number, 10)
}

function changeLength(e) {
  const input = e.currentTarget
  changePasswordLength(input.value)
}
function generatePassword() {
  if (
    typeof passwordLength !== 'number' ||
    isNaN(passwordLength) ||
    passwordLength < 1
  ) {
    changePasswordLength(16)
    inputLength.value = 16
    activateDialog(dialogMessages.lengthError)
  }
  if (passwordLength > 64) {
    passwordLength = 64
    inputLength.value = 64
    activateDialog(dialogMessages.lengthError)
  }
  passwordField.textContent = getRandomSymbol([48, 122])
}
function initLength() {
  inputLength.addEventListener('input', (e) => {
    return changeLength(e)
  })
}

document.addEventListener('keypress', (e) => {
  if (e.keyCode !== 13) {
    return
  }
  generatePassword()
})
btnGenerate.addEventListener('click', generatePassword)
passwordField.addEventListener('click', (e) => {
  return copyPassword(e)
})

initLength()
initLengthSelectors()
generatePassword()
