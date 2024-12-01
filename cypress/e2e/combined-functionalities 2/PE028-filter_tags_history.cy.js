const mockData = require('./mock_data.json');

describe('Create a Tag and Consult it in History', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    it('Create a tag and verify it appears in history by filter', () => {
        cy.visit(LOCAL_HOST + "#/tags");
        // Assume tag creation code here
        cy.get('input[data-test-input="tag-name"]').type(mockData[0].tagName);
        cy.get('span[data-test-task-button-state="idle"]').click();

        cy.visit(LOCAL_HOST + "#/history");
        cy.wait(2000);

        cy.get('input[data-test-filter="tag"]').type(mockData[0].tagName);
        cy.get('div.history-list').should('contain', mockData[0].tagName);
    });
});
