type ButtonSize = 'small' | 'default' |'large'

declare module 'ani-button' {
  import type { DefineComponent, App } from 'vue'

  interface CommonProps {
    size?: ButtonSize
    iconSize?: number
    speed?: number
  }

  interface FavoriteProps extends CommonProps {
    initValue?: boolean
  }

  const FavoriteButton: DefineComponent<FavoriteProps, {}, any>
  
  export { FavoriteButton }

  const installWra: { install: (app: App) => void }
  export default installWra
}