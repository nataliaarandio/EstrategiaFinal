import { faker } from '@faker-js/faker';

describe('Modify recomendations url', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E016-modify_recomendations_url_before/modify_site_name';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Modify the site name with valid and invalid data', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        // Scenarios
        const scenarios = [
            {
                description: 'Invalid URL',
                data: 'amarillo.', 
                valid: false,
            },
        ];

        scenarios.forEach((scenario, index) => {
            cy.get('button[type="button"]').contains('Add recommendation').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);

            // Limpiar y escribir el dato en el input
            cy.get('input[placeholder="https://www.example.com"]').clear().type(scenario.data);

            // Intentar avanzar
            cy.get('button[type="button"]').contains('Next').click();
            cy.wait(1000)
            cy.get('button[type="button"]').contains('Next').click();



            // Esperar el resultado
            if (scenario.valid) {
                cy.wait(15000)
                cy.get('div.flex.items-center.mt-1')
                    .first()
                    .should('contain.text', scenario.data)
                    .then(() => {
                        cy.log('Validación exitosa');
                    })
                    .catch(() => {
                        cy.log('Validación fallida, tomando captura...');
                        takeScreenshot();
                    });
            } else {
                takeScreenshot();
            }
            
        });
    });
});
