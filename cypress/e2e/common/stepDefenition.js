import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('open {string} page', (targetPage) => {
  cy.visit(targetPage)
})

Then('I wait progressbar to value {string}', (s) => {
  cy.get('[role="progressbar"]').contains('101', { timeout: 18000,  }).should('be.visible')
})

When('I hit Start button', () => {
  cy.get('#startStopButton').click()
})

Then('I check that there are no numbers in the book titles', () => {
  cy.get('.rt-tr-group')
    //This string doesn't cant garantee that your find the digits in titles only, page contains at least 40 elements with this CSS chain
    .find('.rt-td')
    .contains(/\d/)
    .should('not.exist')
})

Given('I should check that base URL works', () => {
  //That process garatee that your test is not depends of any page code errors.
  cy.on('uncaught:exception', (err, runnable) => {
    return false
  })
  cy.request('/')
})

Then('I should click element if dropdown closed only', () => {
  cy.get('#nav').then(($nav) => {
    if (!$nav.hasClass('show')) {
      //The button was pressed, but no action occurred.
      cy.contains('Main Item 2').click();
    }
  });
})

Then('Try to catch 98% in the progressbar', () => {
  function waitForText(selector = '.progress', targetText = '98%', maxAttempts = 100, currentAttempt = 0, timeout = 100) {
    if (currentAttempt >= maxAttempts) {
      throw new Error(`Maximum number of wait attempts (${maxAttempts}) exceeded`);
    }
    if (currentAttempt > 0) {
      cy.wait(timeout)
    }
    cy.get(selector).then($element => {
      const text = $element.text();
      if (text.includes(targetText)) {
        return;
      } else if (+text.replace('%', '') > +targetText.replace('%', '')) { 
        throw new Error(`Test missed the value 98, current value is ${text}`);
      } else {
        cy.log(`Current value: ${text}`)
        waitForText(selector, targetText, maxAttempts, currentAttempt + 1);
      }
    })
  }
  waitForText()
})