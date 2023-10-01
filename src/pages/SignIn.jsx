import { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

function SignIn() {


  const [err, setErrMsg] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const [success, setSuccess] = useState(false)

  const { setAuth } = useContext(AuthContext)


  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('/auth',
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log("response", response)
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      setSuccess(true);



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
                className="btn btn-primary">Login </button>
            </form>

          </div>

        </div>

      </div>

    </section>
  )
}

export default SignIn