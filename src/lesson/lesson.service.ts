import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './lesson.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async getManyLessons(lessonIds: string[]): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: {
        id: {
          $in: lessonIds,
        },
      },
    });
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    return this.lessonRepository.save(
      this.lessonRepository.create({
        id: uuid(),
        ...createLessonInput,
      }),
    );
  }
}
