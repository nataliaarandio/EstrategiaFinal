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


        if (Cypress.config("baseUrl") !== "http://localhost:2369") {
            cy.origin('http://localhost:2369', () => {
                // Código para interactuar con elementos dentro de un iframe
                cy.get('input.ais-SearchBox-input')
                    .click().type("ThisIsAVeryLongSearchTermWithoutAnySpacesToTestTheSearchFunctionality");
            });
        } else {
            // Usa directamente el selector si no estás en un iframe
            cy.get('input.ais-SearchBox-input')
                .click().type("ThisIsAVeryLongSearchTermWithoutAnySpacesToTestTheSearchFunctionality");
        }

        cy.wait(1000);

        // Verificación del comportamiento del previsualizador de búsqueda
        cy.get('.search-preview').should('be.visible');

    });
});
