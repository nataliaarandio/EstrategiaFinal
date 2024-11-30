import { faker } from '@faker-js/faker';

describe('Modify recomendations title', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E016-modify_recomendations_title_before/modify_site_name';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Modify the recomendation title with valid and invalid data', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        const url = 'amarillo.com';
        // Scenarios
        const scenarios = [
            {
                description: 'Title too long',
                data: faker.string.alpha({ length: 2001 }),
                valid: false,
            },
        ];

        scenarios.forEach((scenario, index) => {
            cy.get('button[type="button"]').contains('Add recommendation').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);

            cy.get('input[placeholder="https://www.example.com"]').clear().type(url);

            cy.get('button[type="button"]').contains('Next').click();
            cy.get('button[type="button"]').contains('Next').click();

            cy.wait(3000);

            cy.get('input[type="text"]') 
                .eq(1) 
                .clear()
                .type(scenario.data);

            if (scenario.valid) {
                cy.get('input[type="text"]')
                    .eq(1)
                    .should('have.value', scenario.data) 
                    .then(() => {
                        cy.log('Validación exitosa');
                    })
                    .catch(() => {
                        cy.log('Validación fallida, tomando captura...');
                        takeScreenshot();
                    });
            } else {

                     takeScreenshot()
                }
        });
    });
});
