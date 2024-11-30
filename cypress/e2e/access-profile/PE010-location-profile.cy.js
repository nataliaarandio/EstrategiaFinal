import { faker } from '@faker-js/faker';
describe('Access profile: Error Location', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

      it('Should error in locarion incorrect', () => {

        const nombreAleatorio = faker.number.float();
    

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.contains('label', 'Location').parent().find('input').clear().type(nombreAleatorio);
        cy.contains('label', 'Location').parent().find('input').should('have.value', nombreAleatorio);

        cy.get('button').contains('Save').click({force: true});

        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('exist');

      });

});
