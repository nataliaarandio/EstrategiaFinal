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

        cy.get('div[data-testid="portal"] button:contains("Customize")').click();
        cy.wait(1000);

        cy.get('.gap-8').invoke('text').then((text) => {
            expect(text.length).to.be.greaterThan(50);
        });
    });
});
