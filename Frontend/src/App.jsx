
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Templates from './pages/Templates'
import Profile from './pages/Profile'
import AtsCheck from './pages/AtsCheck'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'




function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="atschecker" element={<AtsCheck/>}/>
            <Route path="templates" element={<Templates/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<SignUp/>}/>
          </Route>
            <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
  

  )
}

export default App
