import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IPokemonDetail } from '../interface/interface';

const fetchPokemonDetail = async (name: string): Promise<IPokemonDetail> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};

export const useGetPokemonDetail = (name: string) => {
  return useQuery<IPokemonDetail, Error>({
    queryKey: ['pokemonDetail', name],
    queryFn: () => fetchPokemonDetail(name),
    enabled: !!name, 
  });
};
