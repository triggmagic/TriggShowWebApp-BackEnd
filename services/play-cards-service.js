const admin = require('firebase-admin');
const db = admin.firestore();
const playCardsCollectionRef = db.collection('playcards');
const _ = require('lodash');
const airTableService = require('./airtable-service')

const syncDataAirtableToFirebase = async () => {
    const allRecords = await airTableService.getAllCards();
    const recordsChunks = _.chunk(allRecords, 500);
    const batchs = [];
    for (const singleChunk of recordsChunks) {
        const addBatch = db.batch();
        for (let single of singleChunk) {
            const productRef = playCardsCollectionRef.doc(single.id);
            addBatch.set(productRef, single.card);
        }
        batchs.push(addBatch.commit());
    };
    await Promise.all(batchs);
};

const setAllDataToReset = async () => {

    // const listDocuments = await playCardsCollectionRef.listDocuments();
    // const listRecordsChunks = _.chunk(listDocuments, 500);
    // const batchs = [];
    // for (const singleChunk of listRecordsChunks) {
    //     const updateBatch = db.batch();
    //     for (const single of singleChunk) {
    //         const cardRef = playCardsCollectionRef.doc(single.id);
    //         updateBatch.update(cardRef, { 'isAssign': false });
    //     }
    //     batchs.push(updateBatch.commit());
    // };
    // await Promise.all(batchs);


    const records = await playCardsCollectionRef.where("isAssign", "==", true).get();
    const docs = !records.empty ? records.docs : [];
    const recordsChunks = _.chunk(docs, 500);
    const batchs = [];
    for (const singleChunk of recordsChunks) {
        const updateBatch = db.batch();
        for (const single of singleChunk) {
            const cardRef = playCardsCollectionRef.doc(single.id);
            updateBatch.update(cardRef, { 'isAssign': false });
        }
        batchs.push(updateBatch.commit());
    };
    await Promise.all(batchs);

}

const getNewPlayCard = async () => {
    const newPlayCard = { URL: "" };
    const playCards = await playCardsCollectionRef.orderBy("number", "asc").where("isAssign", "==", false).limit(1).get();
    if (_.size(playCards.docs) > 0) {
        const card = playCards.docs.pop();
        newPlayCard.URL = card.get("cardImage");
        await card.ref.update({ isAssign: true })
    };
    return newPlayCard;
    // for (const single of playCards.docs) {
    //     console.log(single.data());
    // }
}

const getAllPlayCards = async (limit, pageNumber) => {
    const playCardsData = await playCardsCollectionRef.orderBy("number", 'asc').get();
    const playCardsDocs = playCardsData.docs;

    const per_page = _.isEmpty(limit) ? 10 : _.toInteger(limit);
    const page = _.isEmpty(pageNumber) ? 1 : _.toInteger(pageNumber);
    const offset = (page - 1) * per_page;
    const paginatedItems = playCardsDocs.slice(offset).slice(0, per_page);
    const totalPages = Math.ceil(playCardsDocs.length / per_page);
    const cards = [];
    for (const single of paginatedItems) {
        cards.push(single.data());
    }
    return { cards, totalPages, page, limit: per_page };
    // const total = docs.size;
    // docs.docs
}
module.exports = {
    syncDataAirtableToFirebase,
    setAllDataToReset,
    getNewPlayCard,
    getAllPlayCards
}