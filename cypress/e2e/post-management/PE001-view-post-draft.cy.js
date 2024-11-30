import { faker } from '@faker-js/faker';
describe('Create a draft post', () => {
    
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

  it('Create a draft post successfully', () => {
    const postTitle = faker.word.words();
    const postContent = faker.lorem.paragraph();

    cy.visit(LOCAL_HOST + "#/editor/post");
    cy.wait(3000);
    cy.get('textarea[placeholder="Post title"]').type(postTitle);
    cy.get('div[data-koenig-dnd-container="true"] p[data-koenig-dnd-droppable="true"]')
    .eq(0)  // Selecciona el primer elemento en la lista (índice 0)
    .should('be.visible')
    .type(postContent);
    cy.get('a[data-test-link="posts"]').click();
    cy.contains('Drafts').click();
    cy.contains(postTitle).should('exist');
    
  });
});
