import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AxiosAdapter } from "src/common/adapters/axios.adapter";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { PokeRes } from "./interfaces";

@Injectable()
export class SeedService {

  private pokemons: { name: string, no: number; }[] = [];

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {

  }

  async runSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const { results } = await this.http.get<PokeRes>('https://pokeapi.co/api/v2/pokemon?limit=1126');

    results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      this.pokemons.push({ name, no });
    });

    return await this.pokemonModel.insertMany(this.pokemons);
  }
}
