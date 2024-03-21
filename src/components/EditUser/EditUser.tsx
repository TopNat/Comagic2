import { Button, Form, FormProps, Input, Space } from "antd";
import { useDataStore } from "../../store/context";
import { UserListInterface } from "../../store/userStore";

type FieldType = {
  name: string;
  password: string;
  company: string;
  tel: string;
};

function EditUser() {
  const store = useDataStore();
  const idUser = Number(localStorage.getItem("id"));

  const dataUser = store.users.usersList.find((item) => item.id === idUser);

  const onFinish: FormProps<FieldType>["onFinish"] = (data) => {
    console.log("Success:", data);
    if (idUser) {
      store.users.editUser(data, idUser);
    }
  };

  return (
    <>
      <Space direction="vertical" size={16}></Space>{" "}
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
          label="Ваше имя"
          name="name"
          rules={[{ required: true, message: "Введите имя!" }]}
        >
          <Input defaultValue={dataUser?.name} />
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
          <Input defaultValue={dataUser?.tel} />
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
  );
}
export default EditUser;
