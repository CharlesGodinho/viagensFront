import { User } from './user';

export class Passengers {
    constructor(
        public id: string,
        public name: string,
        public title: string,
        public document: string,
        public birthDate: string,
        public cpfCnpj: string,
        public street: string,
        public numberStreet: string,
        public neighborhood: string,
        public city: string,
        public state: string,
        public cep: string,
        public telephone: string,
        public celphone: string,
        public alternativeTelephone: string,
        public emergencyContact: string,
        public emergencyTelephone: string,
        public date: string,
    ) {}

    public equals(obj: Passengers) : boolean { 
        return this.name === obj.name;
    } 

  }
  