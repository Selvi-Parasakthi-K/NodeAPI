/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty,} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public product_name: string;

  @IsNotEmpty()
  public quantity: number;
}

