import { Flex, Radio, Space } from "antd";
import { useDataStore } from "../../store/context";
import Hotel from "../Hotel";
import { HotelInterface } from "../../store/hotelStore";
import { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";

function ListHotel() {
  const store = useDataStore();
  const [sortHotel, setSortHotel] = useState<HotelInterface[]>([]);
  useEffect(()=>{
    setSortHotel(store.hotels.hotelsList)
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    //setValue(e.target.value);
    setSortHotel(store.hotels.filterByPriority(e.target.value));
  };
 
  // console.log(store);
  //let hotels = store.hotels.filterByPriority("name");
  //let hotels = store.hotels.hotelsList;
  //console.log(hotels);

  return (
    <Space direction="vertical" size={16}>
      Сортировать по:
      <Radio.Group onChange={onChange} >
        <Radio value="star">кол-во звезд</Radio>
        <Radio value="location">удаленность от центра</Radio>
        <Radio value="price">цена</Radio>
        <Radio value="name">названию</Radio>
      </Radio.Group>
      <Flex gap="middle" wrap="wrap">
        {sortHotel.map((item: HotelInterface) => (
          <div key={item.id}>
            <Hotel props={item} />
          </div>
        ))}
      </Flex>
    </Space>
  );
}
export default ListHotel;
