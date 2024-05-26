import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DynamicInput from "../components/DynamicInput";

import { Button, Checkbox, Form, FormProps, Input } from "antd";
import ButtonDynamic from "../components/ButtonDynamic";

type FieldType = {
  username: string;
  password: string;
  confirmPsd: string;

};

const SignUp = () => {

  const [matchPwd, setMatchPwd] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);



  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);

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

              <Form
                name="basic"

                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <DynamicInput type="text" placeholder="username" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <DynamicInput type="password" placeholder="password" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Confirm Password"
                  name="confirmPsd"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <DynamicInput type="password" placeholder="password" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>

              {/* <Form
                name="basic"
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
                  label="Confirm Password"
                  name="ConfirmPsd"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <DynamicInput placeholder="password" type="password" />
                </Form.Item>

                {/* <ButtonDynamic btnType="submit">Register </ButtonDynamic> */}

              {/* <Button type="primary" htmlType="submit" className='bg-main hover:bg-black block w-full rounded-md  px-4 py-2 text-white transition-all'>
                rwgister
              </Button> */}

              {/* </Form>  */}


              <p className="mt-5 text-sm">
                Already have an account
                <Link className="ml-1 text-blue-500" to={"/login"}>
                  login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}


export default SignUp;
