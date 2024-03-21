import { useNavigate } from "react-router-dom";
import { useDataStore } from "../../store/context";
import { Button, Form, type FormProps, Input } from "antd";
import { setSessionData } from "../../services/storage";
import { Typography } from "antd";
import { useState } from "react";

type FieldType = {
  password: string;
  email: string;
};

function Hotel() {
  const { Text } = Typography;
  const store = useDataStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onClickReg = () => {
    navigate(`/reg`);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const entrUser = store.users.filterByUser(values.email, values.password);
    if (entrUser) {
      setSessionData(entrUser?.name, String(entrUser?.id));
      store.users.setAutorization(true);
      navigate(`/`);
    } else {
      setError("Логин или пароль не совпадают!");
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="email"
        label="email"
        rules={[
          {
            required: true,
            message: "Введите e-mail!",
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Введите пароль!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Text type="danger">{error}</Text>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <a onClick={onClickReg}>Зарегистрироваться</a>
      </Form.Item>
    </Form>
  );
}
export default Hotel;
