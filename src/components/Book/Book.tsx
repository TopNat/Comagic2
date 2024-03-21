import { useDataStore } from "../../store/context";
import { useNavigate, useParams } from "react-router-dom";
import {
  DatePicker,
  Card,
  Checkbox,
  Form,
  Button,
  InputNumber,
  CheckboxProps,
  FormProps,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { getUniqId } from "../../services/func";


type FieldTypeBook = {
  services: string[];
  period: string;
  guests: number;
  price: number;
};

function Book() {
  const store = useDataStore();
  const { RangePicker } = DatePicker;
  const dateFormat = "DD-MM-YYYY";
  dayjs.extend(customParseFormat);
  const navigate = useNavigate();
  const { id } = useParams();
  const idUser = Number(localStorage.getItem("id"));

  const [price, setPrice] = useState(0);

  const dataHotel = store.hotels.hotelsList.find(
    (item) => item.id === Number(id)
  );

  useEffect(() => {
    if (dataHotel) setPrice(dataHotel.price);
  }, []);

  const onChange: CheckboxProps["onChange"] = (e) => {
    const value = Number(e.target.value);
    if (e.target.checked) {
      setPrice((prev) => prev + value);
    } else {
      setPrice((prev) => prev - value);
    }
  };

  const onFinish: FormProps<FieldTypeBook>["onFinish"] = (data) => {
    console.log(data.services);
    data.price = price;
    console.log("Success:", data);
    if (!data.guests) data.guests = 1;
    let nameH = "";
    dataHotel?.name ? (nameH = dataHotel?.name) : (nameH = "");
    const periodStr =
      dayjs(data.period[0]).format("DD.MM.YYYY") +
      "-" +
      dayjs(data.period[1]).format("DD.MM.YYYY");
    console.log(periodStr);
    const currentUserlIndex = store.users.usersList.findIndex(
      (item) => item.id === idUser
    );
    const idBooking = getUniqId(
      store.users.usersList[currentUserlIndex].booking
    );
    store.users.addNewBooking(
      {
        id: idBooking,
        nameHotel: nameH,
        services: data.services,
        period: periodStr,
        guests: data.guests,
        price: data.price,
        status: "забронированно",
      },
      idUser
    );
    setTimeout(function () {
      store.users.updateStatus(idUser, idBooking);
      console.log("Привет, мир!");
    }, 5000);
    navigate("/account");
  };

  return (
    <Card title={dataHotel?.name} style={{ maxWidth: 1000 }}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Услуги" valuePropName="checked" name="services">
          <Checkbox.Group style={{ width: "100%" }}>
            <Checkbox onChange={onChange} name="breakfast" value="2000">
              Завтрак
            </Checkbox>
            <Checkbox onChange={onChange} name="city" value="1000">
              Вид на город
            </Checkbox>
            <Checkbox onChange={onChange} name="transfer" value="500">
              Трансфер
            </Checkbox>
            <Checkbox onChange={onChange} name="wi-fi" value="600">
              Wi-Fi
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          label="Период"
          name="period"
          rules={[{ required: true, message: "Введите период пребывания!" }]}
        >
          <RangePicker
            minDate={dayjs(
              dayjs().add(1, "day").format("DD-MM-YYYY"),
              dateFormat
            )}
            maxDate={dayjs(
              dayjs().add(3, "month").format("DD-MM-YYYY"),
              dateFormat
            )}
          />
        </Form.Item>

        <Form.Item label="Кол-во гостей" name="guests">
          <InputNumber min={1} max={4} defaultValue={1} />
        </Form.Item>
        <Form.Item label="Цена" name="price">
          <span>{price}</span>
        </Form.Item>
        <Form.Item label="Готовы?">
          <Button type="primary" htmlType="submit">
            Забронировать
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
  
}
export default Book;
