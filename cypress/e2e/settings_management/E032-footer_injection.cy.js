import { faker } from '@faker-js/faker';

describe('Modify footer Injection', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E016-modify_footer_injection_before/modify_site_name';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    function getIframeBody() {
        return cy
            .get('iframe.site-frame')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap);
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Modify footer injection with valid data', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        const datafaker = faker.lorem.paragraph();

        const scenarios = [
            {
                description: 'HTML',
                data: `<div id="injected-content-footer">${datafaker}</div>`,
                valid: true,
            },
        ];

        scenarios.forEach((scenario, index) => {
            cy.get('#admin-x-settings-scroller > div > div:nth-child(6) > div > div:nth-child(3) > div.z-10.flex.items-start.justify-between > button').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);

            cy.get('button[type="button"]').contains('Site footer').click();
            cy.get('div[data-language="html"]').clear({ force: true });
            cy.get('div[data-language="html"]').type(scenario.data, { parseSpecialCharSequences: false });

            cy.get('button[type="button"]').contains('Save').click();

            cy.visit(LOCAL_HOST + "#/site");

            if (scenario.valid) {
                getIframeBody()
                    .find('#injected-content-footer')
                    .should('exist')
                    .and('contain.text', datafaker);
            } else {
                cy.log('Validación fallida, tomando captura...');
                takeScreenshot();
            }
        });
    });
});
