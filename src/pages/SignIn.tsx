import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useaxiosBackend from "../hooks/usePrivateAxios";
import DynamicInput from "../components/DynamicInput";
import { Checkbox, Form, FormProps } from "antd";
import ButtonDynamic from "../components/ButtonDynamic";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function SignIn() {
  const axiosBackend = useaxiosBackend();
  const inputRef = useRef<HTMLInputElement>(null);

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
    localStorage.setItem("persist", persist.toString());
  }, [persist]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);

    // try {
    //   const response = await axiosBackend.post(
    //     "/auth",
    //     JSON.stringify({ user, pwd }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     },
    //   );

    //   const { accessToken, roles } = response?.data;

    //   setAuth({ user, pwd, roles, accessToken });
    //   setUser("");
    //   setPwd("");

    //   navigate(from, { replace: true });
    // } catch (err) {
    //   if (!err?.response) {
    //     setErrMsg("No Server Response");
    //   } else if (err.response?.status === 400) {
    //     setErrMsg("Missing Username or Password");
    //   } else if (err.response?.status === 401) {
    //     setErrMsg("Unauthorized");
    //   } else {
    //     setErrMsg("Login Failed");
    //   }
    // }
  };

  return (
    <section className="flex h-screen justify-center pt-20">
      <div className="container">
        <div className="flex justify-center">
          <div className="w-full p-4 lg:w-2/3 xl:w-1/3">
            <h3 className="mb-10 text-center text-3xl font-medium">Sign in</h3>

            {err !== "" && (
              <div
                className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 "
                role="alert"
              >
                {err}
              </div>
            )}

            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <DynamicInput
                  type="text"
                  placeholder="username"
                />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <DynamicInput placeholder="password" type="password" />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"

              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <ButtonDynamic btnType="submit">Sign in </ButtonDynamic>
              </Form.Item>
            </Form>

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
