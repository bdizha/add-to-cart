export interface Product {
  id: number;
  type?: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  price?: string;
  image?: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
}

export interface Starship extends Product {
  hyperdrive_rating?: string;
  MGLT?: string;
  starship_class?: string;
}

export interface Vehicle extends Product {
  vehicle_class?: string;
}
