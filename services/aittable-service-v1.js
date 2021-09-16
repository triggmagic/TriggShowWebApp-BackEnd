// const Airtable = require('airtable');
// Airtable.configure({ apiKey: 'keyZO0WooAXay36fM' });
// const base = require('airtable').base('appbzNHAyGKrfQU1H');
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyZO0WooAXay36fM'
});
var base = Airtable.base('appbzNHAyGKrfQU1H');
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyZO0WooAXay36fM' }).base('appbzNHAyGKrfQU1H');


base('ZR2.0 - Data')
    .select({
        fields: ["Image Names", "cardImage", "number"],
        view: "Grid view"
    }).firstPage().then(records => {
       console.log(JSON.stringify(records[0]._rawJson));
        // records array will contain every record in Main View.
    }).catch(err => {
        console.error(err);
        // Handle error.
    })


// base('ZR2.0 - Data').select({
    // Selecting the first 3 records in Grid view:
    // maxRecords: 3,
    // fields: ["Image Names", "cardImage", "number"],
    // view: "Grid view"
// }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    // records.forEach(function (record) {
    //     console.log('Retrieved 1 ==> ', JSON.stringify(record._rawJson));
    //     // console.log('Retrieved 2 =>>', record.get('cardImage'));

    // });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    // fetchNextPage();

// }, function done(err) {
//     if (err) { console.error(err); return; }
// });

