import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthPage } from './Pages/Auth/Auth.page'
import { ErrorPage } from './Pages/Error/Error.page'
import { MainPage } from './Pages/Main/Main.page'
import { WithMobileLayout } from './Layout/Mobile.layout'
import { AddPage } from './Pages/Add/Add.page'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AuthPage /> } />
        <Route path="/home" element={WithMobileLayout(<MainPage />) } />
        <Route path="/add" element={WithMobileLayout(<AddPage />) } />
        <Route path="*" element={ WithMobileLayout(<ErrorPage />) } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
