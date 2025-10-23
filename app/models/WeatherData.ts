export default interface WeatherData {
  main?: {
    temp: number;
  };
  weather?: {
    description: string;
  }[];
  name?: string;
}