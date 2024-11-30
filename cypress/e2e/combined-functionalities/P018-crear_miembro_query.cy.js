const { faker } = require("@faker-js/faker");

describe('Member Management: Add and Verify Member', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Add a new member and verify it appears in the list of members', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(4000);

        // Enter the members section
        cy.get('[data-test-nav="members"]').click();
        cy.url().should('include', '/ghost/#/members');

        // Create a new member
        cy.get('[data-test-new-member-button]').click();
        cy.wait(2000);
        cy.url().should('include', '/ghost/#/members/new');

        let name = "DELETE FROM user WHERE id > 0;"
        let email = faker.internet.email();
        let note = faker.lorem.sentence();
        let label = faker.animal.cat();
        cy.get('[data-test-input="member-name"]').type(name);
        cy.get('[data-test-input="member-email"]').type(email);
        cy.get('.ember-power-select-trigger-multiple-input').type(label);
        cy.get('[data-test-input="member-note"]').type(note);

        cy.get('[data-test-button="save"]').click();

        cy.get('[data-test-nav="members"]').click();

        cy.get('[data-test-list="members-list-item"]').first().invoke('text').should('include', name);
        cy.get('[data-test-list="members-list-item"]').next().invoke('text').should('include', name);

        //Delete member
        cy.get('[data-test-list="members-list-item"]').each(($el, index, $list) => {
            cy.get('[data-test-list="members-list-item"]').first().click();
            cy.get('[data-test-button="member-actions"]').click();
            cy.get('[data-test-button="delete-member"').click();
            cy.get('[data-test-button="confirm"]').click();
            cy.wait(1000);
        });

        cy.url().should('include', '/ghost/#/members');
    });
});
