const mockData = require('./mock_data.json');

describe('Create a Tag and Consult it in History', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Create a tag and verify it appears in history by filter', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        cy.wait(2000);

        cy.get('button.cursor-pointer.text-grey-900.dark\\:text-white').contains('View history').click();
        cy.wait(2000);

        cy.url().should('include', 'history/view');
    });

    it('delete all tags', () => {
        cy.deleteAllTags();
    });
});
