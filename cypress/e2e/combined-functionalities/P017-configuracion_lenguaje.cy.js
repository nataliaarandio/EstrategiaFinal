const { faker } = require("@faker-js/faker");

describe('Member Management: Add and Verify Member', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Add a new member and verify it appears in the list of members', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");

        cy.get('[data-test-nav="settings"]').click();

        cy.get('[data-testid="publication-language"]').find('[type="button"]').click();

        cy.get('[placeholder="Site language"]').clear().type('fjf032j9');

        cy.get('[data-testid="publication-language"]').find('[type="button"]').next().click();

        cy.get('[data-testid="publication-language"]').should('contain', 'fjf032j9');
    });
});
