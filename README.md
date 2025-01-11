# Epic Games Store Freebies Calculator
A tool for calculating how much money you've saved with their free game promotions.

## Usage
1. Login and go to your [Epic Games Account page](https://www.epicgames.com/account).
2. Open your browser's Developer Tools (<kbd>F12</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>)
3. Paste the below code in your console:
```javascript
var savedAmount=0;var games=0;const fetchGames=async(pageToken='')=>{const data=await(await fetch(`https://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory?sortDir=DESC&sortBy=DATE&nextPageToken=${pageToken}&locale=${navigator.language}`)).json();for(let i=0;i<data.orders.length;i++){order=data.orders[i];if(order.promotions.length==0)continue;savedAmount+=order.promotions[0].amount;games+=1}
if(!data.nextPageToken){console.log(`Total free games: ${games}\nSaved amount: ${(savedAmount/100).toFixed(2)+data.orders[0].items[0].amount.replace(/[\d\., ]/g, '')}`);return}
return await fetchGames(data.nextPageToken)}
console.log("Fetching all claimed free games. Please wait...");await fetchGames()
```

Your total saved amount will appear on the console, alongside of your total claimed free games.

You can see the full, unminified code in the [script in this repo](EGS-DiscountCalculator.js).   
Feel free to open an issue to report any kind of error.

## Credits
This [Reddit post by u/slavikme](https://www.reddit.com/r/EpicGamesPC/comments/1epacr9/see_all_your_games_library_from_browser/) for the code to get all Epic Games transactions.