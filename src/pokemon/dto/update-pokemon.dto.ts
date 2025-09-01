import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from "class-validator";
import { CreatePokemonDto } from './create-pokemon.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {

	@IsOptional()
	@IsDate()
	deletedAt?: Date;
}
