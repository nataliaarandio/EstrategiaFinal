import { faker } from '@faker-js/faker';

describe('Change Site Timezone', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E018-change_site_timezone_before/change_site_timezone';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Navigate to timezone settings and change the timezone', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        cy.get(
            '#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(2) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button'
        ).click();

        cy.get('[data-testid="timezone"]').scrollIntoView();

        cy.get('[data-testid="timezone-select"] div.css-cp01gg-control').click();

        cy.get('[role="combobox"]') 
            .should('exist') 
            .type('Madrid, Paris', { delay: 100 }).type('{enter}')



        cy.contains('button', 'Save')
            .should('not.be.disabled')
            .click();

        cy.get('#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(2) > div.flex.flex-col.gap-x-5.gap-y-7.undefined > div > div > div')
            .should('contain.text', '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris')
            .then(() => {
                cy.log('Zona horaria cambiada correctamente.');
            });
    });
});
