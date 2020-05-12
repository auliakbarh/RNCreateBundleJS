import {PersonInChargeSchema} from './PersonInChargeSchema';

export const schemas = {
  PIC: PersonInChargeSchema,
};

export const databaseOptions = {schema: [PersonInChargeSchema]};
