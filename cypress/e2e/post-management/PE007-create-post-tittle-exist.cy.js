import { faker } from '@faker-js/faker';
describe('Create post and publish ', () => {
    
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

  it('Create a post successfully and publish', () => {
    const postTitle = faker.word.words();
    const postContent = faker.lorem.paragraph();

    cy.visit(LOCAL_HOST + "#/editor/post");
    cy.wait(3000);
    cy.get('textarea[placeholder="Post title"]').type(postTitle);
    cy.get('div[data-koenig-dnd-container="true"] p[data-koenig-dnd-droppable="true"]')
    .eq(0)  // Selecciona el primer elemento en la lista (índice 0)
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



    cy.visit(LOCAL_HOST + "#/editor/post");
    cy.wait(3000);
    cy.get('textarea[placeholder="Post title"]').type(postTitle);
    cy.get('div[data-koenig-dnd-container="true"] p[data-koenig-dnd-droppable="true"]')
    .eq(0)  // Selecciona el primer elemento en la lista (índice 0)
    .should('be.visible')
    .type(postContent);
    cy.wait(500);
    cy.get('button').contains('Publish').click({ force: true });
    cy.get('button').contains('Continue, final review').click({ force: true });
    cy.get('button').contains('Publish post, right now').click({ force: true });
    cy.get('header.modal-header')
    .should('be.visible')
    .find('h1')
    .should('not contain.text', 'Boom! It\'s out there.');



    
  });
});
