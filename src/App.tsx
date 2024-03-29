import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppRouter } from './router/AppRouter'

export const App = () => {

  return (
    <Provider store={store}>
      {/* <Dashboard /> */}
      <AppRouter />

    </Provider>
  )
}
