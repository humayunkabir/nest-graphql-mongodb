import { Injectable } from '@nestjs/common';
import { StudentType } from './student.type';
import { StudentRepository } from './sutdent.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
  ) {}

  async getStudent(id: string): Promise<StudentType> {
    return await this.studentRepository.getStudent(id);
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentType> {
    return this.studentRepository.createStudent(createStudentInput);
  }

  async getAllStudents(): Promise<StudentType[]> {
    return this.studentRepository.getAllStudents();
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.getManyStudents(studentIds);
  }
}
