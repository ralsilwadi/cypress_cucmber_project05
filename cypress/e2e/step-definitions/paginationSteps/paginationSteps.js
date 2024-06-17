/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PaginationPage from "../../pages/PaginationPage";

const paginationPage = new PaginationPage()


Given(/^the user is on "([^"]*)"$/, (url) => {
 cy.visit(url)
});


Then(/^the user should see the "([^"]*)" heading$/, (heading) => {
	paginationPage.getHeading(heading).should('be.visible')
});


Then(/^the user should see the "([^"]*)" paragraph$/, (paragraph) => {
	paginationPage.getContent().should('be.visible').and('have.text', paragraph)
});

Then(/^the user should see the "([^"]*)" button is disabled$/, (button) => {
	paginationPage.getButton(button).should('be.disabled')
});

Then(/^the user should see the "([^"]*)" button is enabled$/, (button) => {
	paginationPage.getButton(button).should('be.enabled')
});


When(/^the user clicks on the "([^"]*)" button$/, (button) => {
	paginationPage.getButton(button).click()
});


When(/^the user clicks on the "([^"]*)" button till it becomes disabled$/, (button) => {
	paginationPage.clickNextUntilDisabled(button);
});

Then(/^the user should see "([^"]*)" City with the info below and an image$/, (city, dataTable) => {
  const cityInfo = dataTable.rowsHash();

  const expectedCity = cityInfo.City;
  const expectedCountry = cityInfo.Country;
  const expectedPopulation = cityInfo.Population;

  const expectedDetails = [expectedCity, expectedCountry, expectedPopulation];

  paginationPage.getInfo().each(($el, index) => {
    cy.wrap($el).should('contain.text', expectedDetails[index]);
  });

  // paginationPage.getImage().should('be.visible');
});


