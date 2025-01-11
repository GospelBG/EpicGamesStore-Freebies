# Epic Games Store Freebies Calculator
A tool for calculating how much money you've saved with their free game promotions.

## Usage
1. Login and go to your [Epic Games Account page](https://www.epicgames.com/account).
2. Open your browser's Developer Tools (<kbd>F12</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>)
3. Paste the below code in your console:
```javascript
var currency="";const fetchGamesList=async(e="",t=[])=>{let a=await (await fetch(`https://www.epicgames.com/account/v2/payment/ajaxGetOrderHistory?sortDir=DESC&sortBy=DATE&nextPageToken=${e}&locale=${navigator.language}`)).json(),o=a.orders.reduce((e,t)=>[...e,...t.items.filter(e=>t.promotions&&t.promotions.some(t=>t.amount===e.price)).map(e=>[e.description,t.promotions[0].amount/100])],[]);console.log(`Orders: ${a.orders.length}, Games: ${o.length}, Next Token: ${a.nextPageToken}`);let r=[...t,...o];return(""===currency&&(currency=a.orders[0].items[0].amount.replace(/[\d\., ]/g,"")),a.nextPageToken)?await fetchGamesList(a.nextPageToken,r):r};var savedAmount=0;const games=await fetchGamesList();games.forEach(e=>{savedAmount+=e[1]}),console.log(`Total free games: ${games.length}, Saved amount: ${savedAmount.toFixed(2)+currency}`);
```

Your total saved amount will appear on the console, alongside of your total claimed free games.

You can see the full, unminified code in the [script in this repo](EGS-DiscountCalculator.js).   
Feel free to open an issue to report any kind of error.

## Credits
This [Reddit post by u/slavikme](https://www.reddit.com/r/EpicGamesPC/comments/1epacr9/see_all_your_games_library_from_browser/) for the code to get all Epic Games transactions.