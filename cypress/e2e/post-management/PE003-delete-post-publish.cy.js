import { faker } from '@faker-js/faker';
describe('Delete post Publish ', () => {
    
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

  it('Create a post and delete ', () => {
    const postTitle = faker.word.words();
    const postContent = faker.lorem.paragraph();

    cy.visit(LOCAL_HOST + "#/editor/post");
    cy.wait(3000);
    cy.get('textarea[placeholder="Post title"]').type(postTitle);
    cy.get('div[data-koenig-dnd-container="true"] p[data-koenig-dnd-droppable="true"]')
    .eq(0) 
    .should('be.visible')
    .type(postContent);
    cy.wait(500);
    cy.get('button').contains('Publish').click({ force: true });
    cy.get('button').contains('Continue, final review').click({ force: true });
    cy.get('button').contains('Publish post, right now').click({ force: true });
    cy.get('header.modal-header')
    .should('be.visible')
    .find('h1')
    .should('contain.text', 'Boom! It\'s out there.');
    cy.get('button').contains('Close').click({ force: true });
    cy.get('h3.gh-content-entry-title').contains(postTitle).click();
    cy.wait(100);
    cy.get('button').contains('Unpublish').click({ force: true });
    cy.get('button').contains('Unpublish and revert to private draft →').click({ force: true });
    cy.get('button[title="Settings"]').click();
    cy.get('.settings-menu').should('be.visible');
    cy.get('button').contains('Delete post').click({ force: true });
    cy.wait(1000);
    cy.get('button[data-test-button="delete-post-confirm"]').click();
    cy.wait(1000);
    cy.get('h3').should('not.contain', postTitle);
  
  });
});
