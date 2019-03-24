export interface City {
  name: string;
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  main: {
    temp: any;
  };
}
