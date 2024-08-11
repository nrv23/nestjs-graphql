import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class StatusArgs {

    @Field(() => Boolean, { nullable: true, description: "Estado de la tarea"})
    @IsOptional()
    @IsBoolean()
    status?: boolean;
}