import { faker } from '@faker-js/faker';
describe('Create post with link youtube', () => {
    
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

  it('Create post with link youtube incorrect ', () => {
    const postTitle = faker.word.words();
    const url = faker.animal.cat();

    cy.visit(LOCAL_HOST + "#/editor/post");
    cy.wait(3000);
    cy.get('textarea[placeholder="Post title"]').type(postTitle);
    cy.get('div[data-koenig-dnd-container="true"] p[data-koenig-dnd-droppable="true"]')
    .eq(0) 
    .should('be.visible').click();
    cy.wait(500);
    cy.get('button[aria-label="Add a card"]').click();
    cy.get('button').contains('YouTube').click({ force: true });
    cy.get('input[placeholder="Paste URL to add embedded content..."]').type(url).type('{enter}');
    cy.get('[data-testid="embed-url-error-message"]').should('be.visible').and('contain.text', "Oops, that link didn't work.");
  
    
  });
});
