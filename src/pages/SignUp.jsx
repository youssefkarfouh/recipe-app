import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DynamicInput from "../components/DynamicInput";
import useaxiosBackend from "../hooks/usePrivateAxios";

const SignUp = () => {
  
  const axiosBackend = useaxiosBackend();
  const [err, setErrMsg] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, confirmPwd]);

  useEffect(() => {
    setMatchPwd(pwd === confirmPwd && pwd !== "" && confirmPwd !== "");
  }, [pwd, confirmPwd]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       await axiosBackend.post(
        "/register",
        JSON.stringify({ user, pwd })
      );

      setUser("");
      setPwd("");
      setConfirmPwd("");


    } catch (err) {
     
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <>
      <section className="flex h-screen justify-center pt-20">
        <div className="container">
          <div className="flex justify-center">
            <div className="w-full p-4 lg:w-2/3 xl:w-1/3">
              <h3 className="mb-10 text-center text-3xl font-medium">
                Register
              </h3>

              {err !== "" && (
                <div
                  className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 "
                  role="alert"
                >
                  <span className="font-medium">Danger alert!</span> {err}
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

                  <DynamicInput
                    isRequired={true}
                    inputValue={user}
                    change={(e) => setUser(e.target.value)}
                    inputRef={inputRef}
                    type="text"
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
                  <DynamicInput
                    isRequired={true}
                    inputValue={pwd}
                    change={(e) => setPwd(e.target.value)}
                    type="password"
                    id="password"
                    placeholder="password"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <label
                    htmlFor="psdConfirm"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <DynamicInput
                    isRequired={true}
                    inputValue={confirmPwd}
                    change={(e) => setConfirmPwd(e.target.value)}
                    type="password"
                    id="psdConfirm"
                    placeholder="confirm password"
                  />
                </div>

                <button
                  disabled={!matchPwd}
                  className={`block w-full rounded-md  px-4 py-2 text-white transition-all  ${matchPwd ? "cursor-pointer bg-main hover:bg-main-700 " : "cursor-not-allowed bg-gray-400"}`}
                >
                  Sign Up
                </button>
              </form>
              <p className="mt-5 text-sm">
                Already have an account
                <Link className="ml-1 text-blue-500" to={"/login"}>
                  login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
