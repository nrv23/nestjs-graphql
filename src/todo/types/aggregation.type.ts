import { ObjectType, Field, Int } from '@nestjs/graphql';


@ObjectType({ description: "Todo with aggregations"})
export class AggregationsType {
    @Field(() => Int)
    total: number;

    @Field(() => Int)
    pending: number;

    @Field(() => Int)
    completed: number;

    @Field(() => Int, { deprecationReason: "Ya existe otra propiedad que devuelve el mismo valor"})
    totalCompleted: number;

}