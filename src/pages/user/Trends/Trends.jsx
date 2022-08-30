import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";

export default function Trends() {
  const navigate = useNavigate();
  return (
    <>
      <Result
        className="url__404"
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn đã truy cập không tồn tại."
        extra={
          <Button onClick={() => navigate(`/`)} type="primary">
            Về lại trang chủ
          </Button>
        }
      />
    </>
  );
}
