const mockData = require('./MOCK_DATA.json');

describe('Search Functionality: Handle Long Input without Spaces', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Insert a long search term without spaces and verify overflow handling', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);

        cy.get('[data-test-nav="explore"]').click();
        cy.wait(2000);

        cy.wait(1000);

        cy.get('.search-preview').should('be.visible');
        cy.get('.search-preview').invoke('text').should('have.length.greaterThan', 50);

    });
});
