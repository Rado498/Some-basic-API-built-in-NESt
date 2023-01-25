import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { BasketService } from "../basket/basket.service";
import { ShopItem } from "./shop-item.entity";
import { GetListOfProductsResponse, GetOneProductResponse } from "../interfaces/shop";
import { count } from "rxjs";
import { DataSource, getConnection, Like } from "typeorm";
import { ShopItemDetails } from "./shop-item-details.entity";

@Injectable()
export class ShopService {
  constructor(@Inject(forwardRef(() => BasketService)) private basketService: BasketService, private dataSource: DataSource //zamiast injectować po prostu nazwe serwisu,
              //trzeba dopisac forwardRef(() => <Nazwa> ) żeby zapobiec błędowi cicrucal dependencies
  ) {
  }

  async getProducts(): Promise<GetListOfProductsResponse> {
    const count = await ShopItem.count();
    console.log({ count });

    return await ShopItem.find({
      relations: ["details", "sets"]
    });

  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some(item => item.name === name);        //metoda tablicowa some swraca true jeśli spełnia warunek
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find(item => item.name === name).price;


  }

  async getOneProduct(id: string): Promise<GetOneProductResponse> {
    return await ShopItem.findOneOrFail({ where: { id } }); //findOneOrfail bezpieczne pobieranie pojedynczego elementu
  }

  async removeProduct(id: string) {
    await ShopItem.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.name = "Spagetti";
    newItem.description = "Keczupowe";
    newItem.price = 12.80;

    await newItem.save();

    const details = new ShopItemDetails();
    details.color = "green";
    details.width = 21;

    await details.save();
    newItem.details = details;

    await newItem.save();

    return newItem;
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEverBought: true
    });
    const item = await ShopItem.findOneOrFail({ where: { id } });
    item.boughtCounter++;
    await item.save();
  }

  async findProducts(searchTerm: string): Promise<GetListOfProductsResponse> {

    const data = await this.dataSource
      .createQueryBuilder()
      .select("shopItem") //select, insert, update, delete
      .from(ShopItem, "shopItem")
      .where("shopItem.description LIKE :searchTerm", {
        searchTerm: `%${searchTerm}%`
      })
      .orderBy('price','ASC')
      .getMany();
    return data;
  }
}



