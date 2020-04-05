import { ObjectType, Field, ID } from '@nestjs/graphql';
import { LessonType } from '../lesson/lesson.type';

@ObjectType('Student')
export class StudentType {
  @Field(type => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(type => [LessonType], { defaultValue: [] })
  lessons: string[];
}
