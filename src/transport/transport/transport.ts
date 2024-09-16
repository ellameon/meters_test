import { Client } from "../client";
import { MetersResponse } from "../../types";
import { AddressResponse } from "../../types/AddressResponse";

export const transport = {
  list: (limit: number, offset: number) => Client.get<MetersResponse>(`/meters/?limit=${limit}&offset=${offset}`),
  listAreas: () => Client.get<AddressResponse>(`/areas/?limit=1000`),
  delete: (id: string) => Client.delete(`/meters/${id}`)
}