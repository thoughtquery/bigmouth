'use strict';

// Use co to use syntax similar to a wait -- until Lambda upgrades javascript version
const co = require("co");

// Library that turns callback style functions into async functions that returns a promise so we can wait for it with co.
const Promise = require("bluebird");

// Use bluebird to promisify the module to turn all the callback style functions to async that returns a promise. This
// allows us to re-write the handler function into a generator function 
const Promise.promisifyAll(require("fs"));

function* loadHml() {
// Only load if HTML has not been cached before.
  if (!html) {
	console.log('loading index.html...');
  	html = yield fs.readFileAsync('static/index.html', 'utf-d');
	console.log('Loaded')
  }
		
// Since the html is static, it doesn't make sense to load it on every invocation
	return html;
}

module.exports.handler = co.wrap(function* (event, context, callback) {
// Load HTML asynchronysly and wait for the results
   let html = yield loadHtml();
   let response = {
      statusCode: 200,
      headers: {
	    'Content-Type': 'text/html; charset=UTF-8'
	}
	body: html
  };

  callback(null, response);

});
