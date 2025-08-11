
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
// import AtsChecker from './pages/ATSchecker'
import Templates from './pages/Templates'
import Profile from './pages/Profile'


function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            {/* <Route path="atschecker" element={<AtsChecker/>}/> */}
            <Route path="templates" element={<Templates/>}/>
            <Route path="profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  

  )
}

export default App
