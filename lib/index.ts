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

const install = (app: App) => {
  app.component(FavoriteButton.name, FavoriteButton)
}

export default {
  install
}

export {
  FavoriteButton
}