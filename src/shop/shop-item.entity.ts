import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany
} from "typeorm";
import { ShopItemDetails } from "./shop-item-details.entity";
import { ShopSet } from "./shop-set.entity";

@Entity()
export class ShopItem extends BaseEntity {


  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 50
  })
  name: string;

  @Column({
    length: 1000,
    default: null,
    nullable: true
  })
  description: string;

  @Column({
    type: "float",
    precision: 6,
    scale: 2
  })
  price: number;

  @Column({
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @Column({
    default: 0
  })
  boughtCounter: number;

  @Column({
    default: false
  })
  wasEverBought: boolean;

  @OneToOne(type => ShopItemDetails)
  @JoinColumn()
  details: ShopItemDetails;

@ManyToMany(type => ShopSet, entity => entity.items)
@JoinTable()
  sets: ShopSet[];


  /*
    /!* Subproduct *!/
    @ManyToOne(type => ShopItem, entity => entity.subShopItems)
    mainShopItem: ShopItem

    /!* Produkt główny *!/
  @OneToMany(type => ShopItem, entity => entity.mainShopItem)
  subShopItems: ShopItem[]*/

}