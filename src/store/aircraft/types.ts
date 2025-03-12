export type TypeCompany = 'open' | 'close';

interface AvailableAirlines {
  text: string;
}
export interface AircraftData {
  id: number;
  description: string;
  providerKey: string;
  availableAirlines: AvailableAirlines[];
  secretKey: string | null;
  typeCompany: TypeCompany;
}
