import AppRouter from './router/AppRouter'
import Header from './components/Header'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  )
}

export default App
