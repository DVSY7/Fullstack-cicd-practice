import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // 테이블을 담당하고 있음
export class User{
    
    @PrimaryGeneratedColumn() // auto_increment 자동증가 컬럼
    id!: number;

    @Column() // 컬럼 한개
    name!: string;
}
