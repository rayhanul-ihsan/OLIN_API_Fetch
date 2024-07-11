export interface IPokemonListItem {
    name: string;
    url: string;
  }
  
  export interface IPokemonListResponse {
    results: IPokemonListItem[];
  }
  
  export interface IAbility {
    ability: {
      name: string;
      url: string;
    };
  }
  
  export interface IPokemonDetail {
    abilities: IAbility[];
    height: number;
    weight: number;
  }
  