export const PersonInChargeSchema = {
  name: 'PersonInCharge',
  properties: {
    _id: {type: 'int'},
    siteShortName: 'string',
    userId: 'int',
    fullName: 'string',
    position: 'string',
    createdAt: {type: 'date'},
    isDeleted: {type: 'bool'},
  },
};
