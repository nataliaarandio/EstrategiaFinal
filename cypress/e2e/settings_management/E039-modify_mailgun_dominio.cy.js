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

        cy.get(
            '#admin-x-settings-scroller > div > div:nth-child(5) > div > div:nth-child(4) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button'
        ).click();

        const domain = faker.internet.domainName();

        cy.get('input.peer')
        .first() 
        .should('be.visible') 
        .clear() 
        .type(domain) 

        cy.get('body').click();

        cy.contains('button', 'Save')
            .click();

        cy.wait(2000)
        cy.get(
            '#admin-x-settings-scroller > div > div:nth-child(5) > div > div:nth-child(4) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button'
        ).click();

        cy.get('input.peer').first() 
            .should('have.value', domain);
    });
});
