import { InputType, Field } from 'type-graphql';
import { UserObjectType } from '@typedefs/users.type';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDto implements Partial<UserObjectType> {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstname?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastname?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  birth_year?: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
