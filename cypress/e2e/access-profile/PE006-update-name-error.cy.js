import { faker } from '@faker-js/faker';
describe('Access profile: Error Name', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

      it('Should error in name incorrect', () => {

        const nombreAleatorio = faker.person.firstName();
        // Definir una cadena de símbolos
        const simbolos = '!@#$%^&*()_+[]{}|;:,.<>?/~`';
    
        // Agregar un número aleatorio y un símbolo al nombre
        const concatname = nombreAleatorio  + simbolos;
    

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.contains('label', 'Full name').parent().find('input').clear().type(concatname);
        cy.contains('label', 'Full name').parent().find('input').should('have.value', concatname);

        cy.get('button').contains('Save').click({force: true});

        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('exist');

      });

});
