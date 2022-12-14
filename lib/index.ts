import { App } from 'vue'
import './svg.js'
import './style.css'

function removeSymbolAttribute() {
  const symbols = document.querySelectorAll('symbol')
  symbols.forEach(item => {
    item.querySelectorAll('path').forEach(innerItem => {
      innerItem.removeAttribute('fill')
    })
  })
}
setTimeout(() => {
  removeSymbolAttribute()
})

import FavoriteButton from './favorite/index.vue'
import SlideButton from './slide/index.vue'
import SubmitButton from './submit/index.vue'

const install = (app: App) => {
  app.component(FavoriteButton.name, FavoriteButton)
  app.component(SlideButton.name, SlideButton)
  app.component(SubmitButton.name, SubmitButton)
}

export default {
  install
}

export {
  FavoriteButton,
  SlideButton
}