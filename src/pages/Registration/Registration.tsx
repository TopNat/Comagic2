import { useDataStore } from "../../store/context";
import { Button, Form, FormProps, Input } from "antd";
import { getUniqId } from "../../services/func";
import { useNavigate } from "react-router-dom";

type FieldType = {
  name: string;
  password: string;
  company: string;
  tel: string;
  email: string;
};

function Registration() {
  const store = useDataStore();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (data) => {
    if (data) {
      store.users.addNewUser({
        id: getUniqId(store.users.usersList),
        name: data.name,
        password: data.password,
        company: data.company,
        tel: data.tel,
        mail: data.email,
        booking: [],
      });
      navigate("/entr");
    }
  };

  return (
    <div>
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
          <Input placeholder="Имя" />
        </Form.Item>
        <Form.Item<FieldType> label="Компания" name="company">
          <Input placeholder="Компания" />
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
          <Input placeholder="Телефон" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Не корректный E-mail!",
            },
            {
              required: true,
              message: "Введите E-mail!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const checkEmail = store.users.filterByEmail(value);
                if (!checkEmail) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Такой адрес уже зарегистрирован!")
                );
              },
            }),
          ]}
        >
          <Input placeholder="E-mail" />
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
          <Input.Password placeholder="Пароль" />
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
          <Input.Password placeholder="Повторите пароль" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Registration;
