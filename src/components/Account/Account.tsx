import { Card, Space, Typography } from "antd";
import { useDataStore } from "../../store/context";
import { useObserver } from "mobx-react";

function Account() {
  const { Text, Title } = Typography;

  const store = useDataStore();
  const idUser = localStorage.getItem("id");
  const dataAccount = store.users.usersList.find(
    (item) => item.id === Number(idUser)
  );

  return useObserver(() => {
    return (
      <>
        <Title level={2}>Ваши бронирования:</Title>
        {dataAccount?.booking.map((item, index) => (
          <Card title={item.nameHotel} style={{ maxWidth: 1000 }} key={index}>
            <Space direction="vertical">
              <Text strong>Период бронирования: {item.period}</Text>
              <Text type="secondary">Количество гостей: {item.guests}</Text>
              <Text type="secondary">
                Статус бронирования:<Text strong> {item.status}</Text>
              </Text>
            </Space>
          </Card>
        ))}
      </>
    );
  });
}
export default Account;
