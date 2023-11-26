const DB = require('../models')
const { Op } = require('sequelize')

async function isExist(value, table, field, except_field = null, except_value = null) {
  let models = DB.sequelize.models
  for (const model_name in models) {
    const model = models[model_name]

    if (model.tableName == table) {
      let columns = model.tableAttributes

      let column = columns[field]
      if (column != undefined) {

        let where = {}
        where[field] = value
        if (except_field) {
          where[except_field] = {
            [Op.not]: except_value
          }
        }
        let result = await model.findOne({where})
        return result != null
      }
    }
  }
  return false
}

async function Validate(data, rules) {
  
  let errors = {};
  let isValid = true;
  
  function addError(attribute, message) {
    isValid = false
    if (errors[attribute] === undefined) {
      errors[attribute] = []
    }
    errors[attribute].push(message)
  }

  for (const attribute in rules) {
    if (rules[attribute]) {

      let value = data[attribute]
      let rule = rules[attribute].split('|')

      for (const v of rule) {
        let key = v.split(':')[0]
        let args = (v.split(':').length > 1) ? v.split(':')[1].split(',') : []
    
        if (key == 'required') {
          if (value === undefined || value === '' || value === null) {
            addError(attribute, `The ${attribute} is required.`)
          }
        }
  
        if (key == 'unique') {
          let result = await isExist(value, args[0], args[1], args[2], args[3])
          if (result) {
            addError(attribute, `The ${attribute} is not unique.`)
          }
        }

        if (key == 'exist') {
          let result = await isExist(value, args[0], args[1], args[2], args[3])
          if (!result) {
            addError(attribute, `The ${attribute} is not exist.`)
          }
        }

        if (key == 'numeric') {
          if (isNaN(value)) {
            addError(attribute, `The ${attribute} is numeric.`)
          }
        }
      }
    }
  }
  return {
    isValid, errors
  };
}

module.exports = Validate