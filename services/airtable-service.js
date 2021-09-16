const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyZO0WooAXay36fM'
});
const base = Airtable.base('appbzNHAyGKrfQU1H');
const _ = require("lodash");

const getAllCards = async () => {
    const playcards = [];
    try {
        const records = await base('ZR2.0 - Data').select({
            fields: ["Image Names", "cardImage", "number"],
            view: "Grid view"
        }).all();
        const jsonRecord = records.map(x => x._rawJson);
        for (const single of jsonRecord) {
            const id = _.has(single, 'id') ? single.id : "";
            const fields = _.has(single, "fields") ? single.fields : {};
            const cardImage = !_.isEmpty(fields) ? _.head(fields["cardImage"]) : {};
            if (!_.isEmpty(cardImage) && !_.isEmpty(fields) && !_.isEmpty(id) &&
                _.has(fields, 'number') && _.has(cardImage, 'url')) {
                const singleRecord = {
                    id,
                    card: {
                        id: id,
                        imageName: _.has(fields, 'Image Names') ? fields["Image Names"] : "",
                        cardImage: cardImage.url,
                        number: fields.number,
                        isAssign: false
                    }
                }
                playcards.push(singleRecord);
            }
        }
        return playcards;
    } catch (error) {
        console.log("error", JSON.stringify(error));
        return playcards;
    }
};

module.exports = {
    getAllCards
}


