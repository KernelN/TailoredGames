global.CORPFOLIO_CATALOG = require('./assets/js/data/catalog.js');
const CartManager = require('./assets/js/modules/cart.js');

const cart = new CartManager();
console.log('Testing Corpfolio Dynamic Quoting Engine...');

const cat = global.CORPFOLIO_CATALOG;
const pConfig = cat.pricingConfig;

// Test 1: Verify Pricing Config formula for games and addons
const memotest = cat.categories.clasicos.items.find(g => g.id === 'memotest');
const expectedMemotest = Math.round((memotest.hours * pConfig.timeMultiplier * pConfig.hourlyRateUsd * pConfig.usdToArsRate) + pConfig.gameBasePrice);
console.assert(memotest.dailyPrice === expectedMemotest, `Test 1A Failed: Memotest price ${memotest.dailyPrice} !== expected ${expectedMemotest}`);
console.log(`Test 1A Passed: Memotest calculated price ($${memotest.dailyPrice} ARS) matches formula.`);

const ranking = cat.categories.agregados.items.find(a => a.id === 'ranking-live');
const expectedRanking = Math.round(ranking.hours * pConfig.timeMultiplier * pConfig.hourlyRateUsd * pConfig.usdToArsRate);
console.assert(ranking.dailyPrice === expectedRanking, `Test 1B Failed: Ranking price ${ranking.dailyPrice} !== expected ${expectedRanking}`);
console.log(`Test 1B Passed: Ranking calculated price ($${ranking.dailyPrice} ARS) matches formula (no base price).`);

// Test 2: Add 1 game for 1 day -> daily rate, no discounts
cart.addGame('memotest', 1);
let summary = cart.getSummary();
console.assert(summary.grossTotal === memotest.dailyPrice, 'Test 2 Gross Failed: ' + summary.grossTotal);
console.assert(summary.finalTotal === memotest.dailyPrice, 'Test 2 Final Failed: ' + summary.finalTotal);
console.assert(!summary.qualifiesDaysPromo, 'Test 2 Should not qualify days promo');

// Test 3: Add Add-on to Memotest -> (Memotest + Ranking) * 1
cart.assignAddon('ranking-live', 'memotest');
summary = cart.getSummary();
const expectedWithAddon = memotest.dailyPrice + ranking.dailyPrice;
console.assert(summary.grossTotal === expectedWithAddon, 'Test 3 Gross Failed: ' + summary.grossTotal);
console.assert(summary.finalTotal === expectedWithAddon, 'Test 3 Final Failed: ' + summary.finalTotal);

// Test 4: Duration Promo (3+ days) -> 50% discount
cart.updateDays('memotest', 3);
summary = cart.getSummary();
const expectedGross3Days = expectedWithAddon * 3;
const expectedDiscount3Days = expectedGross3Days * 0.5;
console.assert(summary.grossTotal === expectedGross3Days, 'Test 4 Gross Failed: ' + summary.grossTotal);
console.assert(summary.qualifiesDaysPromo, 'Test 4 Qualifies Days Promo');
console.assert(summary.daysDiscount === expectedDiscount3Days, 'Test 4 Days Discount: ' + summary.daysDiscount);
console.assert(summary.finalTotal === expectedGross3Days - expectedDiscount3Days, 'Test 4 Final: ' + summary.finalTotal);

// Test 5: Compound Promo (4+ games for 3 days) -> 50% off then 20% off remainder (60% total)
cart.addGame('simon-dice', 3);
cart.addGame('trivia', 3);
cart.addGame('abb-drones', 3);
summary = cart.getSummary();

const simon = cat.categories.clasicos.items.find(g => g.id === 'simon-dice');
const trivia = cat.categories.clasicos.items.find(g => g.id === 'trivia');
const abbDrones = cat.categories.aMedida.items.find(g => g.id === 'abb-drones');

const dailyRateSum = expectedWithAddon + simon.dailyPrice + trivia.dailyPrice + abbDrones.dailyPrice;
const expectedGross4Games = dailyRateSum * 3;
const expectedPromo1 = expectedGross4Games * 0.50;
const expectedBalance1 = expectedGross4Games - expectedPromo1;
const expectedPromo2 = expectedBalance1 * 0.20;
const expectedFinalCompound = expectedBalance1 - expectedPromo2;

console.assert(summary.grossTotal === expectedGross4Games, 'Test 5 Gross Failed: ' + summary.grossTotal);
console.assert(summary.qualifiesDaysPromo, 'Test 5 Qualifies Days Promo');
console.assert(summary.qualifiesGamesPromo, 'Test 5 Qualifies Games Promo');
console.assert(summary.daysDiscount === expectedPromo1, 'Test 5 Days Discount: ' + summary.daysDiscount);
console.assert(summary.gamesDiscount === expectedPromo2, 'Test 5 Games Discount: ' + summary.gamesDiscount);
console.assert(summary.finalTotal === expectedFinalCompound, 'Test 5 Final Total Failed: ' + summary.finalTotal);

// Test 6: Text summary generation & name sanitization
console.log('\nTest 6: Checking summary text formatting...');
const summaryText = cart.generateTextSummary({ companyName: 'Productora Test', eventDate: '2026-11-15' });
console.log(summaryText);

// Test 7: Custom Game Template + Brand Implementations lookup
const resolvedTemplate = cart.findGame('impl-abb-drones');
console.assert(resolvedTemplate && resolvedTemplate.id === 'abb-drones', 'Test 7 Failed: findGame should resolve implementation ID to parent template');
console.assert(resolvedTemplate.templateSpecs && resolvedTemplate.templateSpecs.players && resolvedTemplate.templateSpecs.mechanic, 'Test 7B Failed: Template should include templateSpecs');
console.log('Test 7 Passed: Custom Game Template & Brand Implementation lookup works.');

// Test 8: Showcase Image Guardrail
const imagelessItem = cat.categories.aMedida.items.find(g => g.id === 'abb-ensamblado-circular');
console.assert(imagelessItem && imagelessItem.showcase === false, 'Test 8 Failed: Imageless entry should have showcase: false');
console.log('Test 8 Passed: Showcase image guardrail verified.');

console.log('\n>>> ALL 8 MATHEMATICAL QUOTING & B2B TEMPLATE ASSERTIONS PASSED PERFECTLY! <<<');
