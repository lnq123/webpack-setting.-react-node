import AppStateClass from './app_state'

export const AppState = AppStateClass

export default {
  AppState,
}

export const createStoreMap = () => ({
  AppState: new AppState(),
})
