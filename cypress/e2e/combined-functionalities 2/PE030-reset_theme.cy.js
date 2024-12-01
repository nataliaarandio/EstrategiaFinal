describe('Reset Theme to Default in Ghost', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Reset the theme to default', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        cy.wait(2000);

        cy.get('button.cursor-pointer.text-grey-900').contains('Change theme').click();
        cy.wait(2000);
        cy.get('[alt="Source Theme - Newsletter"]').click();
        cy.get('.bg-green').click();
        cy.wait(1000);
        cy.get('.gap-3 > .flex > .bg-black').click();
        cy.wait(1000);
        cy.get('.gap-3 > .flex > .bg-black').should('not.exist');
    });
});
