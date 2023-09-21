import React from 'react'
import { Route,Routes} from 'react-router-dom'
// import Main from './components/Main'
import HomePage from './components/HomePage'



const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route exact path="/" element={<HomePage />} />
        {/* <Route exact path="/main" element={<Main />} /> */}
    </Routes>  
    </>
  )
}

export default AppRoutes;
