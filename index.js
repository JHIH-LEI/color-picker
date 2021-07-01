const rgb = document.querySelector('.rgb')
// color picker
let colorPicker = document.getElementById('pick')
// hex input
const hexInputText = document.getElementById('hex-input-text')
// rgb色碼
let redNum = 0
let greenNum = 0
let blueNum = 0

function renderRGBSlider(colors) {
  let rawHTML = ``
  colors.forEach(color => {
    rawHTML += `
     <div class="rgb-input" id="rgb-${color}">
        <lable class="tag" for="rgb-${color}-input-picker" id="${color}-tag">${color.slice(0, 1)}</lable>
        <input id="rgb-${color}-input-picker" type="range" value="0" min="0" max="255">
        <input class="rgb-text-input" id="input-text-${color}" type="text" placeholder="0" minlength="1" maxlength="3"
          size="5">
      </div>
    `
  }
  );
  rgb.innerHTML += rawHTML
}

renderRGBSlider(['red', 'green', 'blue'])

// rgb slider
const redRangeInput = document.getElementById('rgb-red-input-picker')
const greenRangeInput = document.getElementById('rgb-green-input-picker')
const blueRangeInput = document.getElementById('rgb-blue-input-picker')
// rgb text
const redTextInput = document.getElementById('input-text-red')
const greenTextInput = document.getElementById('input-text-green')
const blueTextInput = document.getElementById('input-text-blue')


// 當拉桿改變時，改變背景顏色
redRangeInput.addEventListener('input', e => {
  redNum = e.target.value
  changeBackground(`rgb(${redNum},${greenNum},${blueNum})`)
  // 讓紅色輸入框的數字跟著改變
  redTextInput.value = redNum
})

greenRangeInput.addEventListener('input', e => {
  greenNum = e.target.value
  changeBackground(`rgb(${redNum},${greenNum},${blueNum})`)
  // 讓綠色輸入框的數字跟著改變
  greenTextInput.value = greenNum
})

blueRangeInput.addEventListener('input', e => {
  blueNum = e.target.value
  changeBackground(`rgb(${redNum},${greenNum},${blueNum})`)
  // 讓藍色輸入框的數字跟著改變
  blueTextInput.value = blueNum
})

colorPicker.addEventListener('input', (e) => {
  let colorHex = e.target.value
  changeBackground(colorHex)
})

function changeBackground(color) {
  document.body.style.backgroundColor = color
}

document.body.addEventListener('input', e => {
  // 讓hex輸入框數字跟著改變
  hexInputText.value = rgbToHex(redNum, greenNum, blueNum)
  // 讓color picker裡面的顏色跟著改變
  colorPicker.value = rgbToHex(redNum, greenNum, blueNum)
})

function rgbToHex(r, g, b) {
  // # + redHex + greenHex + blueHex = hex
  // 分別將r g b轉為hex
  let hex = ""
  let redHex = []
  let blueHex = []
  let greenHex = []
  let remainder = 0
  // red
  // 10進位轉16進位，直到商數為0
  while (r / 16 !== 0) {
    remainder = r % 16

    switch (remainder) {
      default:
        redHex.unshift(remainder);
        break;
      case 10:
        redHex.unshift('A')
        break;
      case 11:
        redHex.unshift('B')
        break;
      case 12:
        redHex.unshift('C')
        break;
      case 13:
        redHex.unshift('D')
        break;
      case 14:
        redHex.unshift('E')
        break;
      case 15:
        redHex.unshift('F')
        break;
    }

    if (r < 16 && redHex.length !== 2) {
      redHex.unshift("0")
    } else if (r === 16) {
      redHex.unshift("1")
    }

    r = Math.floor(r / 16) //除過就要改變原本的數字，以免無限迴圈
  }

  // green
  // 10進位轉16進位，直到商數為0
  while (g / 16 !== 0) {
    remainder = g % 16

    switch (remainder) {
      default:
        greenHex.unshift(remainder);
        break;
      case 10:
        greenHex.unshift('A')
        break;
      case 11:
        greenHex.unshift('B')
        break;
      case 12:
        greenHex.unshift('C')
        break;
      case 13:
        greenHex.unshift('D')
        break;
      case 14:
        greenHex.unshift('E')
        break;
      case 15:
        greenHex.unshift('F')
        break;
    }

    if (g < 16 && greenHex.length !== 2) {
      greenHex.unshift("0")
    } else if (r === 16) {
      greenHex.unshift("1")
    }

    g = Math.floor(g / 16) //除過就要改變原本的數字，以免無限迴圈
  }

  // green
  // 10進位轉16進位，直到商數為0
  while (b / 16 !== 0) {
    remainder = b % 16

    switch (remainder) {
      default:
        blueHex.unshift(remainder);
        break;
      case 10:
        blueHex.unshift('A')
        break;
      case 11:
        blueHex.unshift('B')
        break;
      case 12:
        blueHex.unshift('C')
        break;
      case 13:
        blueHex.unshift('D')
        break;
      case 14:
        blueHex.unshift('E')
        break;
      case 15:
        blueHex.unshift('F')
        break;
    }

    //修正blue為16會出現的bug
    if (b < 16 && blueHex.length !== 2) {
      blueHex.unshift("0")
    } else if (b === 16) {
      blueHex.unshift("1")
    }

    b = Math.floor(b / 16) //除過就要改變原本的數字，以免無限迴圈
  }
  // 如果r,g,b數值為0，16進位就是00
  if (redHex.length !== 2) {
    redHex.unshift("00")
  }

  if (greenHex.length !== 2) {
    greenHex.unshift("00")
  }

  if (blueHex.length !== 2) {
    blueHex.unshift("00")
  }
  // 返回hex
  return ('#' + (redHex + greenHex + blueHex).replace(/,/g, '')) //replace把逗號刪掉
}

