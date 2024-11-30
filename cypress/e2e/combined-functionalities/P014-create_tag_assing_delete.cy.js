import { faker } from '@faker-js/faker';

describe('Content Management: Create and Verify Post', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

    it('Create a new post and verify it appears in the list of posts', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);

        cy.get('[data-test-nav-custom="posts-Published"]').click();
        cy.url().should('include', '/ghost/#/posts');

        cy.get('[data-test-new-post-button]').click();
        cy.wait(2000);
        cy.url().should('include', '/ghost/#/editor/post');

        cy.get('.gh-editor-title', { timeout: 10000 }).should('be.visible');

        let titleFake = faker.lorem.words(5);
        let contentFake = faker.lorem.paragraphs(5);
        cy.get('.gh-editor-title').type(titleFake);
        cy.get('[data-secondary-instance="false"]').type(contentFake);

        cy.get('[data-test-button="publish-flow"]').first().click();
        cy.get('[data-test-button="continue"]').click();
        cy.get('[data-test-button="confirm-publish"]').click();

        cy.get('[data-test-button="close-publish-flow"]').click();

        cy.url().should('include', '/ghost/#/posts');

        cy.get('div.posts-list.gh-list.feature-memberAttribution')
            .should('contain', titleFake);

        const longTagName = faker.lorem.words(1);

        cy.visit(LOCAL_HOST + "#/tags/new/");


        cy.get('input[data-test-input="tag-name"]').type(longTagName);
        cy.get('input[data-test-input="accentColor"]')
            .type("000000".replace(/^#/, ''));
        cy.get('textarea[data-test-input="tag-description"]').type(faker.lorem.paragraphs(1));
        cy.wait(1000);

        cy.get('[data-test-button="save"]').click();

        cy.get('[data-test-nav-custom="posts-Published"]').click();

        cy.get('div.posts-list.gh-list.feature-memberAttribution').first().click();
        cy.get('[data-test-psm-trigger]').click();

        cy.get('div#tag-input').click().type(longTagName + '{enter}')
        cy.wait(1000);

        cy.get('[data-test-breadcrumb]').click();

        cy.get('[data-test-nav="tags"]').click();
        cy.wait(1000);
        cy.get('.gh-list-row.gh-tags-list-item').first().should('contain', "1 post");

        cy.get('section.view-container.content-list').then($section => {
            if ($section.find('a[title="Edit tag"]').length > 0) {
                cy.get('a[title="Edit tag"]').first().click();
                cy.get('button.gh-btn.gh-btn-red.gh-btn-icon[data-test-button="delete-tag"]').click();
                cy.get('div.modal-content[data-test-modal="confirm-delete-tag"]').contains('Delete').click();
                deleteTagIfExists();
            }
        });

    });

});


function deleteTagIfExists() {
    cy.get('section.view-container.content-list').then($section => {
        if ($section.find('a[title="Edit tag"]').length > 0) {
            cy.get('a[title="Edit tag"]').first().click();
            cy.get('button.gh-btn.gh-btn-red.gh-btn-icon[data-test-button="delete-tag"]').click();
            cy.get('div.modal-content[data-test-modal="confirm-delete-tag"]').contains('Delete').click();
            deleteTagIfExists();
        }
    });
}