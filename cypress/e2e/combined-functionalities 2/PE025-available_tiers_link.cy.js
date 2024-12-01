const mockData = require('./mock_data.json');

describe('Settings: Verify Available Tiers Link Visibility', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Check the Available Tiers link does not overflow', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        cy.wait(2000);

        cy.get('[data-test-section="memberships"]').click();
        cy.wait(1000);

        cy.get('button[data-test-button="customize"]').click();
        cy.wait(1000);


        const availableTiersLink = mockData[Math.floor(Math.random() * mockData.length)].availableTiersLink;

        cy.get('input[data-test-input="available-tiers"]').clear().type(availableTiersLink);
        cy.wait(1000);

        cy.get('.link-preview-container').should('contain', availableTiersLink).and('have.css', 'overflow', 'visible'); // Verifica que el enlace no se desborde
    });

});
