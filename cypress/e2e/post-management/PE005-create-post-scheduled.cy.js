import { faker } from '@faker-js/faker';
describe('Create a scheduled post ', () => {
    
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

  it('Create a scheduled post no view in front', () => {
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
    cy.get('button').contains('Right now').click({ force: true });
    cy.wait(500);
    cy.get('div.gh-radio-button[data-test-radio="schedule"]').click({ force: true });
    cy.get('button').contains('Continue, final review').click({ force: true });
    cy.get('button').contains('Publish post').click({ force: true });
    cy.wait(500);

    cy.get('header.modal-header')
    .should('be.visible')
    .find('h1').contains('All set!');
    
  });
});
