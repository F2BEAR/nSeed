import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

export class Types {
  readonly faker = faker;

  readonly id = (value?: string): ObjectId => {
    if (!value || value === '') {
      const newId = new ObjectId();
      return newId;
    } else {
      return ObjectId.createFromHexString(value);
    };
  };

  readonly newDate = (value?: string): Date => {
    if (!value || value === '' ) {
      return new Date();
    } else {
      return new Date(value);
    };
  };

  readonly oneOf = (value?: any[]) => {
    if (!value) {
      console.error('\nError: An Array must be provided as a parameter for oneOf(), received undefined instead');
    } else {
      const length = value.length;
      const random = Math.floor(Math.random() * length);
      return value[random];
    };
  };
};
