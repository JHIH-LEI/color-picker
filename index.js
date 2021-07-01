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

// 當使用者輸入rgb色碼時，能夠改變顏色跟slider
redTextInput.addEventListener('input', (e) => {
  if (redTextInput.value > 255) {
    redRangeInput.value = 255
    redTextInput.value = 255
  }
  redNum = redTextInput.value
  redRangeInput.value = redNum
  changeBackground(`rgb(${redNum},${greenNum},${blueNum})`)
  colorPicker.value = rgbToHex(redNum, greenNum, blueNum)
  hexInputText.value = rgbToHex(redNum, greenNum, blueNum)
})

greenTextInput.addEventListener('input', (e) => {
  if (greenTextInput.value > 255) {
    greenTextInput.value = 255
    greenRangeInput.value = 255
  }
  greenNum = greenTextInput.value
  greenRangeInput.value = greenNum
  changeBackground(`rgb(${redNum},${greenNum},${blueNum})`)
  colorPicker.value = rgbToHex(redNum, greenNum, blueNum)
  hexInputText.value = rgbToHex(redNum, greenNum, blueNum)
})

blueTextInput.addEventListener('input', (e) => {
  if (blueTextInput.value > 255) {
    blueTextInput.value = 255
    blueRangeInput.value = 255
  }
  blueNum = blueTextInput.value
  blueRangeInput.value = blueNum
  changeBackground(`rgb(${redNum},${greenNum},${blueNum})`)
  colorPicker.value = rgbToHex(redNum, greenNum, blueNum)
  hexInputText.value = rgbToHex(redNum, greenNum, blueNum)
})


colorPicker.addEventListener('input', (e) => {
  let colorHex = e.target.value
  changeBackground(colorHex)
  // 改變rgb slider 用parseInt將Hex換成10進位整數
  // hex的格式 #RRGGBB ，#不須轉換要刪掉，否則會變NAN
  let red = parseInt(colorHex.slice(1, 3), 16)
  let green = parseInt(colorHex.slice(3, 5), 16)
  let blue = parseInt(colorHex.slice(5, 7), 16)
  // 讓rgb輸入框顏色跟著改變
  redTextInput.value = red
  greenTextInput.value = green
  blueTextInput.value = blue
  // 讓rgb slider跟著變化
  redRangeInput.value = red
  greenRangeInput.value = green
  blueRangeInput.value = blue
})

document.body.addEventListener('input', e => {
  // 兩種情況，背景顏色是被color picker改變或是rgb slider
  if (e.target.id === 'pick') {
    hexInputText.value = colorPicker.value
  } else if (e.target.type === 'range') {
    // 讓hex輸入框數字跟著改變
    hexInputText.value = rgbToHex(redNum, greenNum, blueNum)
    // 讓color picker裡面的顏色跟著改變
    colorPicker.value = rgbToHex(redNum, greenNum, blueNum)
  }
})

function rgbToHex(r, g, b) {
  // # + redHex + greenHex + blueHex = hex
  // 分別將r g b轉為hex
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

function changeBackground(color) {
  document.body.style.backgroundColor = color
}