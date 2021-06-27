const redRangeInput = document.getElementById('rgb-red-input-picker')
const greenRangeInput = document.getElementById('rgb-green-input-picker')
const blueRangeInput = document.getElementById('rgb-blue-input-picker')
const redTextInput = document.getElementById('input-text-red')
const greenTextInput = document.getElementById('input-text-green')
const blueTextInput = document.getElementById('input-text-blue')
// rgb色碼
let redNum = "0"
let greenNum = "0"
let blueNum = "0"

// 當拉桿改變時，改變背景顏色
redRangeInput.addEventListener('input', e => {
  redNum = e.target.value
  document.body.style.backgroundColor = `rgb(${redNum},${greenNum},${blueNum})`;
  // 讓紅色輸入框的數字跟著改變
  redTextInput.value = redNum
})

greenRangeInput.addEventListener('input', e => {
  greenNum = e.target.value
  document.body.style.backgroundColor = `rgb(${redNum},${greenNum},${blueNum})`;
  // 讓綠色輸入框的數字跟著改變
  greenTextInput.value = greenNum
})

blueRangeInput.addEventListener('input', e => {
  blueNum = e.target.value
  document.body.style.backgroundColor = `rgb(${redNum},${greenNum},${blueNum})`;
  // 讓藍色輸入框的數字跟著改變
  blueTextInput.value = blueNum
})
