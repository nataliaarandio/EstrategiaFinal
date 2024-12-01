const mockData = require('./mock_data.json');

describe('Preview Content: Verify Handling of Long Text', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Enter a long text in the subscribe section and verify preview', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);

        cy.get('[data-test-nav="view-site"]').click();
        cy.wait(2000);

        const longHtmlText = mockData[Math.floor(Math.random() * mockData.length)].longHtmlText; // Obtener el texto largo del JSON

        cy.get('textarea[data-test-input="subscribe"]').clear().type(longHtmlText);
        cy.wait(1000);

        cy.get('button[data-test-button="preview"]').click();
        cy.wait(1000);

        cy.get('.preview-container').should('not.have.class', 'overflow-hidden');
        cy.get('.preview-container').should('contain', 'some recognizable part of the long text');


    });

});
