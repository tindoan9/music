import React, { useEffect } from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchAvatarAction, registerAction } from "../../../../stores/slices/user.slice";


const schema = yup
  .object({
    email: yup
      .string()
      .required("Vui lòng nhập đúng Email!")
      .matches("@gmail.com"),
    password: yup
      .string()
      .min(8, "Mật khẩu không phải trên 8 ký tự!")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Require password")
      .oneOf([yup.ref("password")], "Mật khẩu chưa khớp"),
  })
  .required();

export default function Register() {
  const userInfoState = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avata = userInfoState?.avatar
  const randomAvatar = avata[Math.floor(Math.random() * avata.length)]

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(fetchAvatarAction())
  }, [])

  useEffect(() => {
    register("email", { required: true });
    register("password", { required: true });
    register("confirmPassword", { required: true });
  }, [register]);

  const onFinish = (values) => {
    dispatch(registerAction({values, randomAvatar}));
    navigate(`/login`);
  };

  return (
    <>
      <div className="container">
        <div className="login__form">
          <Form
            className="form"
            onFinish={handleSubmit(onFinish, (err) => console.log(errors))}
          >
            <h1 className="form__title">Đăng ký</h1>
            <Controller
              control={control}
              name="fullname"
              render={({ field: { onChange, value, name, ref } }) => (
                <Form.Item
                  validateStatus={errors.fullname && "error"}
                  help={errors?.fullname?.message}
                  name={["Tên tài khoản"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <div className="form__input-group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Tên tài khoản"
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
              name="email"
              render={({ field: { onChange, value, name, ref } }) => (
                <Form.Item
                  validateStatus={errors.email && "error"}
                  help={errors?.email?.message}
                  name={["email"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <div className="form__input-group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Địa chỉ Email"
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
                  name={["Mật khẩu"]}
                  rules={[
                    {
                      required: true,
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

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value, name, ref } }) => (
                <Form.Item
                  validateStatus={errors.confirmPassword && "error"}
                  help={errors?.confirmPassword?.message}
                  name={["Xác nhận mật khẩu"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <div className="form__input-group">
                    <input
                      type="password"
                      className="form__input"
                      placeholder="Xác nhận mật khẩu"
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
                Đăng ký
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
