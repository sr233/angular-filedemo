import { InMemoryDbService } from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService {
  createDb() {
      const heroes = [
        { id: 11, name : 'A' },
        { id: 12, name : 'B' },
        { id: 13, name : 'C' },
        { id: 14, name : 'D' }
      ];
      return {heroes};
  }

}
