const mockData = require('./mock_data.json');

describe('Filter Blogs by Category and Sort by Members', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Filter blogs by Art category and sort by members', () => {
        cy.visit(LOCAL_HOST + "#/blogs");
        cy.wait(2000);

        cy.get('[data-test-filter="category"]').select('Art');
        cy.get('[data-test-button="sort-by-members"]').click();
        cy.wait(2000);

        cy.get('div.blog-list').find('.blog-item').each(($el) => {
            cy.wrap($el).should('contain', 'Art');
        });
    });
});
