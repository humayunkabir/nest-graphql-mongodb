import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { StudentType } from 'src/student/student.type';
import { StudentService } from '../student/student.service';
import { Lesson } from './lesson.entity';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly sutdentService: StudentService,
  ) {}

  @Mutation(returns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Query(returns => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(returns => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @ResolveField()
  students(@Parent() lesson: Lesson): Promise<StudentType[]> {
    return this.sutdentService.getManyStudents(lesson.students);
  }
}
