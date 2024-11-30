import { faker } from '@faker-js/faker';

describe('Configure Custom Integration description', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E018-configure_custom_integration_description_before/configure_custom_integration';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Configure a custom integration in the advanced section and verify its creation', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        cy.get('#integrations').scrollIntoView();
        cy.get('#integrations').click();

        cy.get(
            '#admin-x-settings-scroller > div > div:nth-child(6) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > button'
        ).click();

        cy.get('input[placeholder="Custom integration"]').type('Custom Integration');

        cy.get('#modal-backdrop button.bg-black').click();

        const longTitle = faker.string.alpha({ length: 20 }); 
        cy.get('input[name=":r1e:"]')
            .clear()
            .type(longTitle);

        const longDescription = faker.string.alpha({ length: 2000 }); 
        cy.get('input[name=":r1g:"]')
            .clear()
            .type(longDescription);


        cy.contains('button', 'Save')
        .should('be.visible')
        .click();

        cy.get('input[name=":r1e:"]').should('have.value', longTitle);
        cy.get('input[name=":r1g:"]').should('have.value', longDescription);
        cy.contains('button', 'Close')
        .should('be.visible')
        .click();

        cy.contains('Custom Integration')
            .should('be.visible')
            .then(() => {
                cy.log('La integración personalizada se configuró correctamente.');
                takeScreenshot();
            });
    });
});
