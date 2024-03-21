import { Button, Card, Form, FormProps, Input, Typography } from "antd";
import { useDataStore } from "../../store/context";
import { useNavigate, useParams } from "react-router-dom";
import { useObserver } from "mobx-react";

type FieldTypeReview = {
  text: string;
};

function Reviews() {
  const {  Title } = Typography;
  const store = useDataStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const isAutorization = store.users.isAutorization;
  const nameUser = localStorage.getItem("name") ?? "";

  const onFinish: FormProps<FieldTypeReview>["onFinish"] = (data) => {
    console.log("Success:", data.text);
    console.log(id);
    store.hotels.addReview(data.text, Number(id), nameUser);
  };

  const dataHotel = store.hotels.hotelsList.find(
    (item) => item.id === Number(id)
  );

  const onClickHotel = (e: any) => {
    navigate(`/book/${id}`);
  };
  return useObserver(() => {
    return (
      <>
       <Title level={4} onClick={onClickHotel}>Отзывы об отеле: {dataHotel?.name}</Title>
        {dataHotel &&
          dataHotel.review.map((item) => (
            <Card title={item.user} style={{ maxWidth: 1000 }}>
              {item.text}
            </Card>
          ))}
        {isAutorization && (
          <Form
            variant="filled"
            style={{ maxWidth: 600, paddingTop: "10px" }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Отзыв"
              name="text"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        )}
      </>
    );
  });
}
export default Reviews;
