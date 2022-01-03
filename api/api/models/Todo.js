/**
 * Todo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    list: {
      model: "list",
    },
    description: "string",
    completed: "boolean",
  },
};

sails.config.models.migrate = "drop";
