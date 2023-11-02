import { useState, useEffect } from 'react'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SignIn() {

  const [err, setErrMsg] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state ? location.state.from.pathname : "/"

  console.log("location in sign in component", location)


  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('/auth', JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');

      console.log("from in sigin ", from)
      navigate(from, { replace: true })


    } catch (err) {

      console.log("err", err)
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  return (
    <section className='login p-5'>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">

            <h3 className="text-center my-5">Sign in</h3>

            {err !== '' &&
              <div class="alert alert-danger" role="alert">
                {err}
              </div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  value={user}
                  required
                  onChange={(e) => setUser(e.target.value)}
                  type="text" className="form-control" id="username" placeholder="username" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  value={pwd}
                  required
                  onChange={(e) => setPwd(e.target.value)}
                  type="password" className="form-control" id="password" placeholder="password" />
              </div>
              <button
                className="btn btn-primary">Login
              </button>
            </form>

            <p className='mt-3'>You don`t have an account <Link to={"/register"}>Register</Link></p>

          </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn