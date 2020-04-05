import {
  Resolver,
  Args,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { LessonType } from 'src/lesson/lesson.type';
import { LessonService } from '../lesson/lesson.service';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly lessonService: LessonService,
  ) {}

  @Query(returns => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Mutation(returns => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query(returns => [StudentType])
  students() {
    return this.studentService.getAllStudents();
  }

  @ResolveField()
  lessons(@Parent() student: Student): Promise<LessonType[]> {
    return this.lessonService.getManyLessons(student.lessons);
  }
}
