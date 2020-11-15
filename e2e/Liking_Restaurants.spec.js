const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('Like a Restaurants', async ({ I }) => {
    I.see('data is empty', '.text__not-found');
    
    I.amOnPage('/');

    I.seeElement('resto-item');

    const firstResto = locate('.post-item__name').first();
    const firstRestoItem = await I.grabTextFrom(firstResto);
    I.click(firstRestoItem);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('resto-item');
    const likedResto = await I.grabTextFrom('.post-item__name');

    assert.strictEqual(firstRestoItem, likedResto);
});

Scenario('Unlike a Restaurants', async ({ I }) => {
    I.see('data is empty', '.text__not-found');
    
    I.amOnPage('/');

    I.seeElement('resto-item');

    const firstResto = locate('.post-item__name').first();
    const firstRestoItem = await I.grabTextFrom(firstResto);
    I.click(firstRestoItem);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('resto-item');
    const likedResto = await I.grabTextFrom('.post-item__name');

    I.click(firstRestoItem);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('#not-found');
    const unlikedResto = await I.grabTextFrom('.text__not-found');

    assert.strictEqual(firstRestoItem, likedResto, unlikedResto);
});
