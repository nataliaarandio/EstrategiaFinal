const mockData = require('./MOCK_DATA.json');

describe('verifier icon listing', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('verifier icon listing', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);

        cy.visit(LOCAL_HOST + "#/explore/connect");
        cy.wait(1000);

        cy.get('[data-test-button="submit-explore"]').click();
        cy.wait(1000);

        cy.get('img[src$=".png"]').should('exist');
    });
});
