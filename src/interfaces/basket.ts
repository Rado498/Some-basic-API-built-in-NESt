import { AddProductDto } from "../basket/dto/create-product-dto";

export type AddProductToBasketResponse = {
  isSuccess: true;
  index: number
} | {
  isSuccess: false;
}
export interface RemoveProductFromBasketResponse {
isSuccess: boolean
}
export type ListProductsInBasketResponse = AddProductDto[] // typ na podstawie klasy

export type GetTotalPriceResponse = number | {
  isSuccess: false;
  alternativeBasket: AddProductDto[]
}




