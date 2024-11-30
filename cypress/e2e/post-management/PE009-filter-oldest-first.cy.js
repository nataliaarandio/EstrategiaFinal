import { faker } from '@faker-js/faker';
describe('Filter oldest first ', () => {
    
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

  it('view filter oldest first', () => {
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

    const postTitlenew = faker.word.words();
    cy.visit(LOCAL_HOST + "#/editor/post");
    cy.wait(3000);
    cy.get('textarea[placeholder="Post title"]').type(postTitlenew);
    cy.get('div[data-koenig-dnd-container="true"] p[data-koenig-dnd-droppable="true"]')
    cy.get('button[title="Settings"]').click();
    cy.get('.settings-menu').should('be.visible');
    cy.get('input[placeholder="YYYY-MM-DD"]').clear().type('2024-12-25',{ force: true });// Inserta la fecha deseada
    cy.get('button[title="Settings"]').click();
    cy.get('button').contains('Publish').click({ force: true });
    cy.get('button').contains('Continue, final review').click({ force: true });
    cy.get('button').contains('Publish post, right now').click({ force: true });
    cy.get('button').contains('Close').click({ force: true });
    cy.wait(500);
    
    cy.get('.gh-contentfilter.view-actions-bottom-row')
    .contains('Newest first')  // Busca el texto "Newest first"
    .click();  // Hace clic en el elemento que contiene ese texto

    cy.get('ul.ember-power-select-options')
            .find('li.ember-power-select-option')
            .contains('Oldest first')  // Busca el texto "Oldest first"
            .click();  // Haz clic en la opción

   cy.get('div[data-koenig-dnd-container="true"] p[data-koenig-dnd-droppable="true"]')
   .eq(0) 
  .should('be.visible')
  .type(postTitlenew);

    
  });
});
