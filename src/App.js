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
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom'

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route path='login' element={<Login />} />
        <Route path='Register' element={<Register />} />
        <Route path='linkpage' element={<LinkPage />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* protected */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.User, ROLES.Admin]} />}>
            <Route path='editor' element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor, ROLES.User]} />}>
            <Route path='lounge' element={<Lounge />} />
          </Route>
        </Route>
        {/* 404 */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes >
  );
}

export default App;