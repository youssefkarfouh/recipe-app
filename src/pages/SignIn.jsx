import { useState, useEffect, useRef } from "react";

import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/usePrivateAxios";

function SignIn() {
  const axiosPrivate = useAxiosPrivate();
  const inputRef = useRef(null);

  const [err, setErrMsg] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : "/";

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  useEffect(()=>{
    inputRef.current.focus();
  } , [])
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        "/auth",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <section className="flex h-screen justify-center pt-20">
      <div className="container">
        <div className="flex justify-center">
          <div className="w-full p-4 lg:w-2/3 xl:w-1/3">
            <h3 className="mb-10 text-center text-3xl font-medium">Sign in</h3>

            {err !== "" && (
              <div
                class="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 "
                role="alert"
              >
                   {err}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col gap-2">
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                ref={inputRef}
                  value={user}
                  required
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-main focus:outline-none"
                  id="username"
                  placeholder="username"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  value={pwd}
                  required
                  onChange={(e) => setPwd(e.target.value)}
                  type="password"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-main focus:outline-none"
                  id="password"
                  placeholder="password"
                />
              </div>
              <div className="mb-4 flex gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={persist}
                  id="persist"
                  onChange={(e) => setPersist(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="persist">
                  Remember me
                </label>
              </div>


              <button
                disabled={user == '' || pwd == ''}
                  className={`block w-full rounded-md  px-4 py-2 text-white transition-all  ${user !== '' && pwd !== '' ? "bg-main hover:bg-main-700 cursor-pointer " : "cursor-not-allowed bg-gray-400"}`}
                >
                  Login
                </button>
            </form>

            <p className="mt-5 text-sm">
              You don`t have an account
              <Link className="ml-1 text-blue-500" to={"/register"}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
