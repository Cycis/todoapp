import { Route, Routes } from 'react-router-dom';
import {
  Home, Login, Register, Protect
} from './components/index'

function App() {
  return (
    <div className='relative w-full min-w-screen-lg h-screen bg-[#023047] px-12 mx-auto flex items-center justify-center'>
      <Routes >
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Protect />}>
          <Route path='' element={<Home />} />
        </Route>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
