import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAction } from "../../../../stores/slices/user.slice";
import { Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Vui lòng nhập đúng Email!")
      .matches("@gmail.com"),
    password: yup
      .string()
      .min(5, "Mật khẩu phải ít nhất 5 kí tự!")
      .required("Password is required"),
  })
  .required();

export default function Login() {
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = userInfoState?.loading

  if (userInfoState.data) {
      navigate(`/`)
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  const onFinish = (values) => {
    console.log(values);
    dispatch(loginAction(values));
  };

  return (
    <>
      <div className="container">
        <div className="login__form">
          <Form
            className="form"
            name="basic"
            onFinish={handleSubmit(onFinish, (err) => console.log(errors))}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <h1 className="form__title">Đăng nhập</h1>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, name, ref } }) => (
                <Form.Item
                  validateStatus={errors.email && "error"}
                  help={errors?.email?.message}
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <div className="form__input-group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Email"
                      onChange={onChange}
                      value={value}
                      name={name}
                      ref={ref}
                    />
                  </div>
                </Form.Item>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, name, ref } }) => (
                <Form.Item
                  validateStatus={errors.password && "error"}
                  help={errors?.password?.message}
                  name="passowrd"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <div className="form__input-group">
                    <input
                      type="password"
                      className="form__input"
                      placeholder="Mật khẩu"
                      onChange={onChange}
                      value={value}
                      name={name}
                      ref={ref}
                    />
                  </div>
                </Form.Item>
              )}
            />

            <Form.Item>
              <button className="form__button" type="submit">
                {loading && (<LoadingOutlined style={{
                  fontSize: '18px',
                  display: 'block',
                  textAlign: 'center'
                }} />)}
                Đăng nhập
              </button>
            </Form.Item>
          </Form>
          <br />
          <p>
            Không có tài khoản?{" "}
            <NavLink to={"/register"}>Tạo tài khoản</NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
