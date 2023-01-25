import { Module } from "@nestjs/common";
import { BasketModule } from "./basket/basket.module";
import { ShopModule } from "./shop/shop.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "./database.module";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "shop",
      entities: ["dist/**/**.entity{.ts,.js}"],
      bigNumberStrings: false,
      logging: true,
      synchronize: true
    }),
    DatabaseModule,
    BasketModule,
    ShopModule

  ]

})
export class AppModule {
}
