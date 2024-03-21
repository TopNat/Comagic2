import { action, computed, observable, makeAutoObservable } from "mobx";

export interface UserListInterface {
  id: number;
  name: string;
  password: string;
  company: string;
  tel: string;
  mail: string;
  booking: Booking[];
}

export interface Booking {
  id: number;
  nameHotel: string;
  services: string[];
  period: string;
  guests: number;
  price: number;
  status: string;
}

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable
  isAutorization: boolean = !!localStorage.getItem("name");

  usersList: UserListInterface[] = [
    {
      id: 1,
      name: "Natalie",
      password: "password",
      company: "CoMagic",
      tel: "89053601281",
      mail: "gavrikovanatalie@mail.ru",
      booking: [
        {
          id: 1,
          nameHotel: "Palace Bridge Hotel",
          services: [""],
          period: "28.03.20244-01.04.2024",
          guests: 2,
          price: 3500,
          status: "забронированно",
        },
      ],
    },
    {
      id: 2,
      name: "Marina",
      password: "password",
      company: "CoMagic",
      tel: "89053601281",
      mail: "gavrikovanatalie@gmail.com",
      booking: [],
    },
  ];

  @action
  setAutorization(isAuth: boolean) {
    this.isAutorization = isAuth;
  }
  addNewUser(newUser: UserListInterface) {
    this.usersList.push(newUser);
  }
  editUser(
    dataUser: Omit<UserListInterface, "mail" | "booking" | "id">,
    idUser: number
  ) {
    console.log(dataUser);
    const currentUserlIndex = this.usersList.findIndex(
      (item) => item.id === idUser
    );
    this.usersList[currentUserlIndex].name = dataUser.name;
    this.usersList[currentUserlIndex].company = dataUser.company;
    this.usersList[currentUserlIndex].password = dataUser.password;
    this.usersList[currentUserlIndex].tel = dataUser.tel;
  }

  addNewBooking(newBooking: Booking, idUser: number) {
    const currentUserlIndex = this.usersList.findIndex(
      (item) => item.id === idUser
    );
    this.usersList[currentUserlIndex].booking.push({
      id: newBooking.id,
      nameHotel: newBooking.nameHotel,
      services: newBooking.services,
      period: newBooking.period,
      guests: newBooking.guests,
      price: newBooking.price,
      status: newBooking.status,
    });
  }

  updateStatus(idUser: number, idBooking: number) {
    const currentUserlIndex = this.usersList.findIndex(
      (item) => item.id === idUser
    );
    const currentBookinglIndex = this.usersList[
      currentUserlIndex
    ].booking.findIndex((item) => item.id === idBooking);
    this.usersList[currentUserlIndex].booking[currentBookinglIndex].status =
      "подтверждено";
  }

  @computed
  filterByUser(mail: string, password: string) {
    return this.usersList.find(
      (item) => item.mail === mail && item.password === password
    );
  }

  filterByEmail(mail: string) {
    return this.usersList.find((item) => item.mail === mail);
  }
}
