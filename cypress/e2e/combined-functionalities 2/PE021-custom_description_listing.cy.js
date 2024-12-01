const mockData = require('./MOCK_DATA.json');


describe('Add a long text description to a listing and verify overflow behavior', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const randomData = mockData[Math.floor(Math.random() * mockData.length)];
    const longTextWithoutSpaces = randomData.longTextDescription;

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Add a long text description without spaces and verify overflow', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);

        cy.visit(LOCAL_HOST + "#/explore/connect");
        cy.wait(1000);

        cy.get('[data-test-button="submit-explore"]').click();
        cy.wait(1000);

        cy.get('div.relative.rounded.bg-white.p-6.shadow-sm').eq(2).click().type(longTextWithoutSpaces);
        cy.wait(1000);

        cy.get('.preview-section').should('be.visible');
        cy.get('.preview-section').invoke('text').should('have.length.greaterThan', 100);

        cy.get('span[data-test-task-button-state="idle"]').click();
    });

});
