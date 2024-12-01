describe('Change Theme in Ghost', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Change the base theme of Ghost', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        cy.wait(2000);

        cy.get('[data-test-theme-toggle]').click();
        cy.wait(2000);

        cy.get('.theme-status').should('contain', 'Theme changed successfully');
    });
});
