var isArray = require('isarray');
var { isFunction } = require('lodash');
var factory = require('../factory');

module.exports = factory({
  initialize: function(opts) {
    this.opts = opts || {};
    this.name = this.opts.name;
    this.values = this.opts.values;
    this.verbose = this.opts.verbose;
    this.description = this.opts.description;
    this.type = this.opts.type;
    if (isArray(this.values) === false && isFunction(this.values) === false) {
      throw new Error('Invalid enum values: ' + this.values);
    }
  },
  match: function(path, value) {
    if (this.values.indexOf(value) === -1) {
      var detail = this.verbose ? (' (' + this.values.join(',') + ')') : '';
      var type = this.name || 'enum value';
      return 'should be a valid ' + type + detail;
    }
  },
  matchAsync: async function(path, value) {
    this.values = await this.values(value)
    return this.match(path, value)
  },
  toJSONSchema: function () {
    var schema = { 'enum': this.values };
    if (this.description) {
      schema.description = this.description;
    }
    if (this.type) {
      schema.type = this.type;
    }

    return schema;
}
});
