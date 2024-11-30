import { faker } from '@faker-js/faker';
describe('Create post with html', () => {
    
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

  it('Create post with html incorrect ', () => {
    const postTitle = faker.word.words();

    cy.visit(LOCAL_HOST + "#/editor/post");
    cy.wait(3000);
    cy.get('textarea[placeholder="Post title"]').type(postTitle);
    cy.get('div[data-koenig-dnd-container="true"] p[data-koenig-dnd-droppable="true"]')
    .eq(0) 
    .should('be.visible').click();
    cy.wait(500);
    cy.get('button[aria-label="Add a card"]').click();
    cy.get('button').contains('HTML').click({ force: true });
    cy.wait(500);
    cy.get('div[contenteditable="true"]').first().click().clear().type(postTitle);
    cy.get('button').contains('Publish').click({ force: true });
  
    
  });
});
