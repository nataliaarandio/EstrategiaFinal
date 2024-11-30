import { faker } from '@faker-js/faker';

describe('Modify recomendations description', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E016-modify_recomendations_description_before/modify_site_name';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Modify the recommendation description with invalid data', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        const url = faker.internet.domainName(); // Generar URL válida dinámica

        // Scenarios
        const scenarios = [
            {
                description: 'Description too long',
                data: faker.string.alpha({ length: 200 }), // Generar descripción inválida (>200 caracteres)
                valid: false,
            },
        ];

        scenarios.forEach((scenario, index) => {
            cy.get('button[type="button"]').contains('Add recommendation').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);

            // Llenar campo de URL
            cy.get('input[placeholder="https://www.example.com"]')
                .clear()
                .type(url);

            // Navegar al siguiente paso
            cy.get('button[type="button"]').contains('Next').click();
            cy.get('button[type="button"]').contains('Next').click();

            cy.wait(15000)
            // Llenar título
            cy.get('input[name=":r1e:"]') // Selector por name más confiable
                .clear()
                .type(faker.string.alpha({ length: 50 }));

            // Llenar descripción
            cy.get('textarea[name=":r1g:"]') // Selector por name para el textarea
                .clear()
                .type(scenario.data);

            // Captura de pantalla después de ingresar datos
            takeScreenshot();

            // Intentar guardar la recomendación
            cy.get('div.flex.items-center.justify-start button:nth-of-type(2)')
            .should('be.visible')
            .click();

            // Validar resultado
            if (scenario.valid) {
                // Validar que la descripción fue guardada correctamente
                cy.get('textarea[name=":r1g:"]')
                    .should('have.value', scenario.data)
                    .then(() => {
                        cy.log('Validación exitosa.');
                        takeScreenshot();
                    });
            } else {
                    takeScreenshot();
            }
        });
    });
});
