import { useNavigate, useParams } from "react-router-dom";
import { useDataStore } from "../../store/context";
import { Card, Typography, Space, Image, Flex, Divider, Button } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function HotelBook() {
  const { Text } = Typography;
  const navigate = useNavigate();
  dayjs.extend(customParseFormat);
  const { id } = useParams();
  const store = useDataStore();

  const dataHotel = store.hotels.hotelsList.find(
    (item) => item.id === Number(id)
  );

  const onClickButton = () => {
    navigate(`/bookHot/${id}`);
  };
  const onClickReviews = () => {
    navigate(`/reviews/${id}`);
  };
  return (
    <Card title={dataHotel?.name} style={{ maxWidth: 1000 }}>
      <Flex gap="middle" wrap="wrap">
        {dataHotel?.photo.map((item, i) => (
          <Card key={i}>
            <Image height={150} src={item} />
          </Card>
        ))}
      </Flex>

      <Space direction="vertical">
        <Text strong>Количество звезд: {dataHotel?.star}</Text>
        <Text strong>Удаленность от центра: {dataHotel?.location} км.</Text>
        <Text type="secondary">{dataHotel?.description}</Text>
        <a onClick={onClickReviews}>Отзывы ...</a>
      </Space>
      <Divider />
      <Button type="primary" style={{ width: "100%" }} onClick={onClickButton}>
        Забронировать
      </Button>
    </Card>
  );
}
export default HotelBook;
