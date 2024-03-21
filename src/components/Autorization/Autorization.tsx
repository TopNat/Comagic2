import { Button, Dropdown, MenuProps, Space } from "antd";
import { clearSessionData, getSessionData } from "../../services/storage";
import { useNavigate } from "react-router-dom";
import { useDataStore } from "../../store/context";
import { DownOutlined } from "@ant-design/icons";

function Autorization() {
  const store = useDataStore();
  const navigate = useNavigate();
  const isAutorization = store.users.isAutorization;

  const dataUser = getSessionData();
  const currentUserlIndex = store.users.usersList.findIndex(
    (item) => item.id === Number(dataUser.id)
  );
  if (currentUserlIndex < 0) clearSessionData();

  const Exit = () => {
    clearSessionData();
    store.users.setAutorization(false);
    navigate("/");
  };
  const Office = () => {
    navigate("/account");
  };
  const onClickEditUser = () => {
    navigate("/user");
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={Office}>Личный кабинет</span>,
    },
    {
      key: "2",
      label: <span onClick={onClickEditUser}>Управление аккаунтом</span>,
    },
    {
      key: "3",
      label: <span onClick={Exit}>Выйти</span>,
    },
  ];

  const onClick = () => {
    navigate("/entr");
  };

  return (
    <>
      {isAutorization ? (
        <span>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Добро пожаловать, {dataUser.name}!
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </span>
      ) : (
        <Button type="primary" onClick={onClick}>
          Войти
        </Button>
      )}
    </>
  );
}
export default Autorization;
