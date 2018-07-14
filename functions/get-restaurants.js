'use strict';

const co = require('co');
const aws = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

function* getRestaurants(count) {
    let req = {
        // Pass in by lamba env variables
        TableName: tableName,
        Limit: count
    }

    let resp = yield dynamodb.scan(req).promise();
    return resp.Items;

module.exports.handler = co.wrap(functions* (event, context, cb) {
    let restaurants = yield getRestaurants(defaultResults);
    let response = {
        statusCode: 200,
        body: JSON.stringify(restaurants)
    }
  cb(null, response);
});
