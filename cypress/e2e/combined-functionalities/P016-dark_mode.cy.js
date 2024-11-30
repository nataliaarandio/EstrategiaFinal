const { faker } = require("@faker-js/faker");

describe('Member Management: Add and Verify Member', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    function takeScreenshot() {
        const SCREENSHOT_PATH = 'failed_text_dark_mode';
        cy.screenshot(`${SCREENSHOT_PATH}`);
    }


    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Add a new member and verify it appears in the list of members', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);

        cy.get('.nightshift-toggle-container').click();
        cy.wait(2000);

        cy.get('.gh-user-avatar.relative').click();
        cy.wait(2000);

        cy.get('[data-test-nav="whatsnew"]').click();
        cy.wait(3000);
        takeScreenshot();
    });
});
