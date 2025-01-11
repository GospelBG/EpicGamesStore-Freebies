/**********************************************************************************************************************
* Paste this code in your console while you are in your Epic Games account page (http://epicgames.com/account)
* This code will request all your free games purchases and return an object which should be copied to the clipboard
* to be used in the Python script.
*
* In case you get a warning error which prevents you from copy-pasting code, type "allow pasting" and try again.
**********************************************************************************************************************/

var savedAmount = 0;
var games = 0;

const fetchGames = async (pageToken = '') => {
    const data = await (await fetch(`https://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory?sortDir=DESC&sortBy=DATE&nextPageToken=${pageToken}&locale=${navigator.language}`)).json();

    for (let i = 0; i < data.orders.length; i++) {
        order = data.orders[i];
        if (order.promotions.length == 0) continue;
        savedAmount += order.promotions[0].amount;
        games += 1;
    }

    if (!data.nextPageToken) {
        console.log(`Total free games: ${games}\nSaved amount: ${(savedAmount/100).toFixed(2)+data.orders[0].items[0].amount.replace(/[\d\., ]/g, '')}`); // To get currency symbol, get any transaction price string and get the symbol
        return
    }
    return await fetchGames(data.nextPageToken);
}

console.log("Fetching all claimed free games. Please wait...");
await fetchGames();