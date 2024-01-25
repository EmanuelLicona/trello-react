import { Provider } from 'react-redux'
import { Dashboard } from './home/Dashboard'
import { store } from './store/store'

export const App = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  )
}
