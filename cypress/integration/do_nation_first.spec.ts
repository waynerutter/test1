

describe('Pledge Flow', () => {

  it('A User can make a pledge', () => {
    // For each pledge in fixtures run this test
    cy.fixture('../fixtures/pledges.json').each((pledge) => {
      //Go to route
      cy.visit('/')
      // For each pledge find the pledge and click on it
      cy.findByText(pledge['pledge']).click();
      // Check description
      cy.findByText(pledge['description']).should('exist');
      // Click Take the step button
      cy.findByRole('button', { name: /take this step/i }).click();
      // Check description
      cy.findByText(pledge['description']).should('exist');
      // Click the i'm in button
      cy.findByRole('button', { name: /i'm in let's go!/i }).click();
      // Check question
      cy.findByText(pledge['question']).should('exist');
      // Check input and plus and minus buttons
      cy.findByRole('textbox').should('contain', '1');
      cy.findAllByRole('button').eq(1).click();
      cy.findByRole('textbox').should('contain', '2');
      cy.findAllByRole('button').eq(1).click();
      cy.findByRole('textbox').should('contain', '3');
      cy.findAllByRole('button').eq(0).click();
      cy.findByRole('textbox').should('contain', '2');
      cy.findByRole('link', { name: /next/i }).click();
      // Select a option
      cy.findByText(pledge['savedCarbon']).should('not.exist');
      cy.findByText(pledge['option1']).click();
      cy.findByText(pledge['savedCarbon']).should('exist');
      cy.findByRole('link', { name: /next/i }).click();
      // Answer Question
      cy.findByRole('textbox').should('contain', '1');
      cy.findAllByRole('button').eq(1).click();
      cy.findByRole('textbox').should('contain', '2');
      cy.findAllByRole('button').eq(1).click();
      cy.findByRole('textbox').should('contain', '3');
      cy.findAllByRole('button').eq(0).click();
      cy.findByRole('textbox').should('contain', '2');
      cy.findAllByRole('button').eq(0).click();
      cy.findByRole('textbox').should('contain', '1');
      // Maybe the carbon saving number goes up and down here as well so should check that if it does
      cy.findByRole('link', { name: /next/i }).click();
      // Check Statement should also check text box but as I do not know what it should do yet skipped for now
      cy.findByText(pledge['statement']).should('exist');
      cy.findByRole('button', { name: /count me in/i }).click();
      //Should test landing page after pressing this button but not sure f it is always Create account
    })
  });
});
