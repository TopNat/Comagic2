import { HotelStore } from "./hotelStore";
import { UserStore } from "./userStore";

export function createStore() {
  return {
    users: new UserStore(),
    hotels: new HotelStore(),
  };
}
export type Store = ReturnType<typeof createStore>;
