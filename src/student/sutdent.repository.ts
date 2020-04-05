import { Repository, EntityRepository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async getStudent(id: string): Promise<Student> {
    return await this.findOne({ id });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    // With Entity
    // const student: Student = new Student();
    // student.firstName = createStudentInput.firstName;
    // student.lastName = createStudentInput.lastName;
    // student.lessons = createStudentInput.lessons;
    // return await student.save();

    // With Repository
    const student: Student = this.create({ id: uuid(), ...createStudentInput });
    return await this.save(student);
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.find();
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return await this.find({ where: { id: { $in: studentIds } } });
  }
}
