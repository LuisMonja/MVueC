import { Column, Entity, BaseEntity } from "typeorm";
import bcrypt from "bcrypt";


@Entity()
export class User extends BaseEntity {

    comparePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

    setPassword(password: string): void {
        this.password = bcrypt.hashSync(password, 10);
    }

    getPassword(): string {
        return this.password;
    }

    @Column({ type: "varchar", length:25,primary: true })
    username: string;

    @Column({ type: "varchar", length:55 })
    name: string;

    @Column({ type: "varchar", length:100, select: false })
    private password: string;


}