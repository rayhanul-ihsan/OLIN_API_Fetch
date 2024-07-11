import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IPokemonListResponse } from '../interface/interface';

const fetchPokemonList = async (): Promise<IPokemonListResponse> => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
  return response.data;
};

export const useGetPokemonList = () => {
  return useQuery<IPokemonListResponse, Error>({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
  });
};
