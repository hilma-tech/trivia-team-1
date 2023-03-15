import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'string-or-number', async: false })
export class IsNumberOrString implements ValidatorConstraintInterface {
    validate(text: any, args: ValidationArguments) {
        return typeof text === 'number' || typeof text === 'string';
    }

    defaultMessage(args: ValidationArguments) {
        return '($value) must be number or string';
    }
}

export class QuizDTO {
    @IsString()
    @IsNotEmpty()
    creatorId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDefined()
    @Validate(IsNumberOrString)
    imageUrl: number | string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    questions: QuestionDTO[];
}

export class QuestionDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDefined()
    @Validate(IsNumberOrString)
    imageUrl: number | string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(4)
    answers: AnswerDTO[];
}

export class AnswerDTO {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsDefined()
    @Validate(IsNumberOrString)
    imageUrl: number | string;

    @IsBoolean()
    @IsNotEmpty()
    isCorrect: boolean;
}

export class ScoreDTO {
    @IsNumber()
    @IsNotEmpty()
    score: number;

    @IsString()
    @IsNotEmpty()
    player: string;
}