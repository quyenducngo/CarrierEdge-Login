const { Builder, By, until } = require('selenium-webdriver');
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');

setDefaultTimeout(10 * 1000); // Set default timeout to 60 seconds

let driver;

Given('I launch the Chrome browser', async function () {
  driver = await new Builder().forBrowser('chrome').build();
});

When('I navigate to the login page', async function () {
  await driver.get('https://www.carriersedge.com/');
  const loginButton = await driver.findElement(By.css('#login-menu a.btn.btn-primary[title="Login"]'));
  await driver.wait(until.elementIsVisible(loginButton), 10000);
  await loginButton.click();
  const modal = await driver.findElement(By.id('loginModal'));
  await driver.wait(until.elementIsVisible(modal), 10000);
});

When('I enter a valid username and password', async function () {
  const username = await driver.findElement(By.name('j_username'));
  const password = await driver.findElement(By.name('j_password'));
  await username.sendKeys('validUsername');
  await password.sendKeys('validPassword');
  const submitButton = await driver.findElement(By.css('.btn.primary'));
  await submitButton.click();
});

When('I enter an invalid username and password', async function () {
  const username = await driver.findElement(By.name('j_username'));
  const password = await driver.findElement(By.name('j_password'));
  await username.sendKeys('invalidUsername');
  await password.sendKeys('invalidPassword');
  const submitButton = await driver.findElement(By.css('.btn.primary'));
  await submitButton.click();
});

// Then('I should see the dashboard page', async function () {
// });

Then('I should see a login error message', async function () {
  await driver.wait(until.urlIs('https://www.carriersedge.com/ce/login.jsp?error=true'), 10000);
  const errorMessage = await driver.findElement(By.xpath("//h1[text()='Login Error']"));
  expect(await errorMessage.isDisplayed()).to.be.true;
  await driver.quit();
});