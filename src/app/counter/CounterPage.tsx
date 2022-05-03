import React from "react";
import { Counter } from "./Counter";
import { useGetPokemonByNameQuery } from "app/counter/pokemon";
import Page from "lib/layout/Page";

type Props = {};

export function Pokemon() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
}

const CounterPage = (props: Props) => {
  return (
    <Page>
      <button className="bg-red-700 text-white p-3 w-auto rounded-lg hover:bg-red-900 focus:outline-none focus:ring shadow-md hover:shadow-none transition-all duration-300 mt-5">
        Test
      </button>
    </Page>
  );
};

export default CounterPage;
