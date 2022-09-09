import { useRef, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
const LOGIN_URL = '/auth'
const Login = () => {
  const location = useLocation();
  const route = location.state?.from?.pathname || "/"
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus();
  }, [])
  //when ever the user sees the error message and start typing it will remove the error message
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    //prevent default behavior of the form which will reload the page
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response?.data);

      const accessToken = response?.data?.accessToken;
      console.log(accessToken);
      const roles = response?.data?.roles;
      console.log(roles);
      setAuth({ user, pwd, roles, accessToken });
      navigate(route, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }

  }
  return (
    <>
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>
            Username:
          </label>
          <input
            type='text'
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor='password'>
            Password:
          </label>
          <input
            type='password'
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Sign In</button>
        </form>
        <p>
          Need an Account? <br />
          <Link to={'/register'}>Sign Up</Link>
        </p>
      </section>
    </>
  )
}

export default Login