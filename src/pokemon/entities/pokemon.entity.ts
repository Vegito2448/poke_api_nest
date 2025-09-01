import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
	// id: mongo assigned automatically
	@Prop({
		unique: true,
		index: true,
	})
	name: string;

	@Prop({
		unique: true,
		index: true,
	})
	no: number;

	@Prop({
		default: null,
		nullable: true,
	})
	deletedAt?: Date;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);