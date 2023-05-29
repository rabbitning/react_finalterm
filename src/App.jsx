import { Provider } from "react-redux"
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Router from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

// import { feedArticles } from "./api"
// feedArticles()

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}