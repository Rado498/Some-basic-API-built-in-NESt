import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { ShopItem } from "./shop-item.entity";

@Entity()
export class ShopItemDetails extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 15
  })
  color: string;

  @Column()
  width: number;

  @OneToOne(type => ShopItem)
  shopItem:ShopItem
}

