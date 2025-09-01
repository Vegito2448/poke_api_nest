import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
	@IsString()
	@MinLength(1)
	@MaxLength(20)
	@IsNotEmpty()
	name: string;

	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	no: number;
}
