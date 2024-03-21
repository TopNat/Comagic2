import { useNavigate } from "react-router-dom";
import { Card, Image, Space, Typography } from "antd";
import { StarTwoTone } from "@ant-design/icons";
import { HotelInterface } from "../../store/hotelStore";

interface PropsHotel {
  props: HotelInterface;
}

function Hotel({ props }: PropsHotel) {
  const { Text } = Typography;
  const navigate = useNavigate();
  const arrStar = [];
  for (let i = 0; i < props.star; i++) {
    arrStar[i] = 1;
  }
  const onClick = () => {
    navigate(`/book/${props.id}`);
  };
  const onClickReviews = () => {
    navigate(`/reviews/${props.id}`);
  };

  return (
    <Card
      hoverable
      title={props.name}
      style={{ width: 300 }}
      extra={<a onClick={onClick}>Подробнее...</a>}
    >
      <Space style={{ paddingBottom: "15px" }}>
        <Space.Compact block>
          <Text style={{ paddingRight: "10px" }}>
            {arrStar.map((_, index) => (
              <StarTwoTone key={index} />
            ))}
          </Text>
          <Text mark>{props.location}км. от центра</Text>
          <Text strong style={{ paddingLeft: "2px" }}>
            от {props.price}р.
          </Text>
        </Space.Compact>
      </Space>

      <Image height={200} src={props.photo[0]} />
      <a onClick={onClickReviews}>Отзывы ...</a>
    </Card>
  );
}
export default Hotel;
