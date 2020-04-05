import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

// Like DTO
@InputType()
export class CreateStudentInput {
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @Field()
  lastName: string;

  @Field(type => [ID], { defaultValue: [] })
  lessons: string[];
}
