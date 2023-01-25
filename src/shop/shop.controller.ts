import { Controller, Delete, Get, HostParam, Inject, Param, Post, Redirect } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { CreateProductResponse, GetListOfProductsResponse, GetOneProductResponse } from "../interfaces/shop";
import { DataSource } from "typeorm";

@Controller ('/shop')
export class ShopController {
  constructor(

    @Inject(ShopService) private shopService: ShopService) {
  }

  @Get("/")
  async getListOfProducts(): Promise<GetListOfProductsResponse> {
    return this.shopService.getProducts();

  }
  @Get('/find/:searchTerm')
  testFindItem(
    @Param('searchTerm') searchTerm: string //searchTerm daję możliwość wyszukiwania danych np. opisu w url
  ): Promise<GetListOfProductsResponse>{
    return this.shopService.findProducts(searchTerm);

  }


  @Get("/:id")
  getOneProduct(
    @Param("id") id: string
  ): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
  }

  @Delete("/:id")
  removeProduct(
    @Param("id") id: string
  ) {
    return this.shopService.removeProduct(id);
  }

  @Post("/")
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }
}


