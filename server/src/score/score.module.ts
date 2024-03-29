import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from 'src/entities/score.entity';
import { ScoreService } from './score.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [ScoreService],
  exports: [ScoreService]
})
export class ScoreModule { }
