import { IsNotEmpty } from "class-validator";

export class RegisterDTO {
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  username: string;
}