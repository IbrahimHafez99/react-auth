import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Editor from './components/Editor';
import Home from './components/Home';
import Layout from './components/Layout';
import LinkPage from './components/LinkPage';
import Lounge from './components/Lounge';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom'
import useAuth from './hooks/useAuth';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150
}

function App() {
  const { auth } = useAuth()
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route path='login' element={<Login />} />
        <Route path='Register' element={<Register />} />
        <Route path='linkpage' element={<LinkPage />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* protected */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path='editor' element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path='admin' element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
          <Route path='lounge' element={<Lounge />} />
        </Route>
        {/* 404 */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes >
  );
}

export default App;