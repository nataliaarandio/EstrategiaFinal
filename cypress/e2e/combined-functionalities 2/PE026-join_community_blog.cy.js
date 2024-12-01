const mockData = require('./mock_data.json');

describe('Join a Community Blog', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Join a community blog', () => {
        cy.visit(LOCAL_HOST + "#/blogs");
        cy.wait(2000);

        cy.get('[data-test-button="join-community"]').first().click();
        cy.wait(2000);

        cy.get('div.subscription-status').should('contain', 'You are now a member');
    });
});
