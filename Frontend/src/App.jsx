
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Upload from './pages/Upload'


function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="upload" element={<Upload/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  

  )
}

export default App
