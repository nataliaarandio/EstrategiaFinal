describe('Change Theme in Ghost', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Change the base theme of Ghost', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        cy.wait(2000);

        cy.get('button.cursor-pointer.text-grey-900').contains('Change theme').click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .bg-grey-100 > .h-full').click();

        cy.get('button.cursor-pointer.bg-green.text-white').contains(/Update Edition|Install/).then(($btn) => {
            if ($btn.text().includes('Update Edition')) {
                $btn.click();
                cy.wait(1000);
                cy.get('.flex > .bg-red').click();
                cy.get('.flex > .bg-red').should('contain', 'Installing');
            } else {
                $btn.click();
                cy.get('.bg-green > span').should('contain', 'Installing');
            }
        });
    });
});
