import { useState } from 'react';
import { useGetPokemonDetail } from './hooks/useGetPokemonDetail';
import { useGetPokemonList } from './hooks/useGetPokemonList';
import { IAbility, IPokemonListItem } from './interface/interface';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const { data: pokemonList, isLoading: isLoadingList, error: errorList } = useGetPokemonList();
  const { data: pokemonDetail, isLoading: isLoadingDetail, error: errorDetail } = useGetPokemonDetail(selectedPokemon || '');

  if (isLoadingList) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (errorList) {
    return <div className="flex justify-center items-center h-screen">Error fetching data: {errorList.message}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-indigo-600 mb-8">PokeAPI</h1>
      <div className="bg-white shadow-md rounded-lg p-4 w-full sm:w-96 mb-8">
        <div className="bg-indigo-600 text-white rounded-t-lg p-4">
          <h2 className="text-xl font-semibold text-center">Pokemon List</h2>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {pokemonList?.results.map((pokemon: IPokemonListItem, index: number) => (
            <button
              key={index}
              className="flex-1 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-200"
              onClick={() => setSelectedPokemon(pokemon.name)}
            >
              {pokemon.name}
            </button>
          ))}
        </div>
      </div>
      {selectedPokemon && (
        <div className="bg-white shadow-md rounded-lg p-4 w-full sm:w-96">
          <div className="bg-indigo-600 text-white rounded-t-lg p-4">
            <h2 className="text-xl font-semibold text-center">Pokemon Detail</h2>
          </div>
          {isLoadingDetail ? (
            <div className="mt-4 text-center">Loading...</div>
          ) : errorDetail ? (
            <div className="mt-4 text-center text-red-600">Error fetching data: {errorDetail.message}</div>
          ) : (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">{selectedPokemon}</h3>
              <ul className="list-disc list-inside mb-4">
                {pokemonDetail?.abilities.map((ability: IAbility, index: number) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
              <div className="mb-2">
                <strong>Height:</strong> {pokemonDetail?.height}
              </div>
              <div>
                <strong>Weight:</strong> {pokemonDetail?.weight}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
