import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from "./entities/pokemon.entity";

@Injectable()
export class PokemonService {

  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = +this.configService.get<number>('defaultLimit')!;
  }


  async create(createPokemonDto: CreatePokemonDto) {


    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto);


      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto) {

    const { limit = this.defaultLimit, offset = 0 } = pagination;

    const pokemons = await this.pokemonModel.find().skip(offset).limit(limit).sort({ no: 1 }).select('-__v');

    return pokemons;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon term: ${term} not found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {
      const pokemon = await this.findOne(term);

      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }

      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {

      this.handleExceptions(error);

    }
  }

  async remove(id: string) {
    const pokemon = await this.findOne(id);

    if (pokemon?.deletedAt) {
      throw new BadRequestException(`Pokemon with this id: ${id} was already deleted`);
    }


    const updatePokemonDto: UpdatePokemonDto = { deletedAt: new Date() };

    await pokemon.updateOne(updatePokemonDto);
    return { id, message: 'Pokemon deleted successfully' };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.error(error);
    throw new InternalServerErrorException('Cannot make changes - Check server logs');
  }

}
