import { User } from './user';

export class Ticket {
    constructor(
        public id: string,
        public number: number,
        public title: string,
        public status: string,
        public priority: string,
        public image: string,
        public user: User
    ) {}

    public equals(obj: Ticket) : boolean { 
        return this.number === obj.number;
    } 

  }
  