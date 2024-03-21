import { Button, Form, FormProps, Input, Space, Typography } from "antd";
import { useDataStore } from "../../store/context";
import { useState } from "react";

type FieldType = {
  name: string;
  password: string;
  company: string;
  tel: string;
};

function EditUser() {
  const { Text } = Typography;
  const store = useDataStore();
  const idUser = Number(localStorage.getItem("id"));
  const [message, setMessage] = useState("");

  const dataUser = store.users.usersList.find((item) => item.id === idUser);

  const onFinish: FormProps<FieldType>["onFinish"] = (data) => {
    if (idUser) {
      store.users.editUser(data, idUser);
    }
    setMessage("Данные обновлены.");
  };

  return (
    <>
      {message ? (
        <Text strong style={{ paddingLeft: "2px" }}>
          {message}
        </Text>
      ) : (
        <>
          <Space direction="vertical" size={16}></Space>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              tel: dataUser?.tel,
              name: dataUser?.name,
              company: dataUser?.company,
            }}
          >
            <Form.Item<FieldType>
              label="Ваше имя"
              name="name"
              rules={[{ required: true, message: "Введите имя!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="Компания" name="company">
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Телефон"
              name="tel"
              rules={[
                { required: true, message: "Введите номер телефона!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const val =
                      /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){9,12}\d$/;
                    if (val.exec(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Некорректный номер"));
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                {
                  required: true,
                  message: "Введите пароль!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Повторите пароль"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Повторите пароль!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароли не совпадают!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
}
export default EditUser;
