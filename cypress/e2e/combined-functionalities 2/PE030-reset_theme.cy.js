describe('Reset Theme to Default in Ghost', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Reset the theme to default', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        cy.wait(2000);

        cy.get('[data-test-reset-theme]').click();
        cy.wait(2000);

        cy.get('.theme-status').should('contain', 'Theme reset to default successfully');
    });
});
