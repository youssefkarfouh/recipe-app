import { useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {Checkbox, Form, FormProps, Input, InputRef } from "antd";
import ButtonDynamic from "../components/ButtonDynamic";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useMutation } from "@tanstack/react-query";
import { QUERIES } from "../data/QueryKeys";
import { login } from "../services/auth";
import { I_AuthState } from "../interfaces/authContext";

type FieldType = {
  user: string;
  pwd: string;
  remember?: string;
};

function SignIn() {

  const inputRef = useRef<InputRef>(null);

  const { data, isPending, isError, error, mutate: authenticate } = useMutation({
    mutationKey: [QUERIES.USER_INFO],
    mutationFn: login
  })


  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : "/";


  useEffect(() => {
    localStorage.setItem("persist", persist.toString());
  }, [persist]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);

    const { user, pwd } = values

    authenticate({ user, pwd },
      {
        onSuccess: ({ roles, accessToken }:I_AuthState) => {

          setAuth({ user, pwd, roles, accessToken });
          navigate(from , {replace:true})
        }
      })

    // if (!err?.response) {
    //   setErrMsg("No Server Response");
    // } else if (err.response?.status === 400) {
    //   setErrMsg("Missing Username or Password");
    // } else if (err.response?.status === 401) {
    //   setErrMsg("Unauthorized");
    // } else {
    //   setErrMsg("Login Failed");
    // }

  };

  return (
    <section className="flex h-screen justify-center pt-20">
      <div className="container">
        <div className="flex justify-center">
          <div className="w-full p-4 lg:w-2/3 xl:w-1/3">
            <h3 className="mb-10 text-center text-3xl font-medium">Sign in</h3>

            {isError && (
              <div
                className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 "
                role="alert"
              >
                {error.message}
              </div>
            )}

            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              initialValues={{ remember: false }}
            >
              <Form.Item<FieldType>
                label="Username"
                name="user"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input ref={inputRef} type="text" placeholder="username" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Password"
                name="pwd"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input type="password" placeholder="password" />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"
              >
                <Checkbox onChange={(e: CheckboxChangeEvent) => setPersist(e.target.checked)} >Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <ButtonDynamic loading={isPending} btnType="submit">
                  Submit
                </ButtonDynamic>
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
