/**********************************************************************************************************************
* Paste this code in your console while you are in your Epic Games account page (http://epicgames.com/account)
* This code will request all your free games purchases and return an object which should be copied to the clipboard
* to be used in the Python script.
*
* In case you get a warning error which prevents you from copy-pasting code, type "allow pasting" and try again.
**********************************************************************************************************************/

var currency = '';
const fetchGamesList = async (pageToken = '', existingList = []) => {

    const data = await (await fetch(`https://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory?sortDir=DESC&sortBy=DATE&nextPageToken=${pageToken}&locale=${navigator.language}`)).json();
    const gamesList = data.orders.reduce((acc, value) => [
        ...acc, 
        ...value.items
            .filter(v => value.promotions && value.promotions.some(promo => promo.amount === v.price))
            .map(v => [v.description, value.promotions[0].amount/100])
    ], []);
    console.log(`Orders: ${data.orders.length}, Games: ${gamesList.length}, Next Token: ${data.nextPageToken}`);
    const newList = [...existingList, ...gamesList];

    if (currency === '') currency = data.orders[0].items[0].amount.replace(/[\d\., ]/g, '');

    if (!data.nextPageToken) return newList;
    return await fetchGamesList(data.nextPageToken, newList);
}
var savedAmount = 0;
const games = await fetchGamesList();

games.forEach(game => {
    savedAmount += game[1];
});
console.log(`Total free games: ${games.length}, Saved amount: ${savedAmount.toFixed(2)+currency}`);