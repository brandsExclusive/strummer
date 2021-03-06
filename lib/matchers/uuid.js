var factory = require('../factory');
var regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

module.exports = factory({
  initialize: function(opts) {
    this.opts = opts || {};
    this.version = this.opts.version;
    this.description = this.opts.description;
    this.message = 'should be a UUID' + (this.version ? ' version ' + this.version : '');
  },
  match: function(path, value) {
    if (typeof value !== 'string') {
      return this.message;
    }
    if (regex.test(value) === false) {
      return this.message;
    }
    // UUID version
    var version = value[14];
    if (this.version && this.version.toString() !== version) {
      return this.message;
    }
  },
  toJSONSchema: function () {
    var format = 'uuid'
    if (this.version) {
      format += '-v' + this.version
    }
    var schema = {
      type: 'string',
      format: format
    };
    if (this.description) {
      schema.description = this.description;
    }
    return schema;
  }
});
