const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');

describe('Create a new tag with long name', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with a very long name', () => {

        cy.request('GET', APIREST + '?schema=tag').then((response) => {
            expect(response.status).to.eq(200);

            let radom_data = response.body[Math.floor(Math.random() * response.body.length)];

            const longTagName = radom_data.longDescription; // Campo para el nombre de la etiqueta

            cy.visit(LOCAL_HOST + "#/tags/new/");
            cy.wait(3000);


            cy.get('input[data-test-input="tag-name"]').type(longTagName);
            cy.get('input[data-test-input="accentColor"]')
                .type(radom_data.accentColor.replace(/^#/, ''));
            cy.get('textarea[data-test-input="tag-description"]').type(radom_data.description);
            cy.wait(1000);

            cy.get('.mr2 > .error > :nth-child(1)').should('contain.text',
                'Tag names cannot be longer than');
        });
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});


const mockData = require('./MOCK_DATA.json');

describe('Assign multiple tags to a post and verify they are saved correctly', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const randomTag1 = mockData[Math.floor(Math.random() * mockData.length)];
    const randomTag2 = mockData[Math.floor(Math.random() * mockData.length)];

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags(randomTag1.tagName);
        cy.createTags(randomTag2.tagName);
    });

    it('Assign multiple tags to a post and verify they are saved correctly', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(1000);

        cy.get('a[data-test-nav-custom="posts-Published"]').click();
        cy.wait(1000);

        cy.get('li.gh-list-row.gh-posts-list-item.gh-post-list-plain-status:first a.gh-list-data.gh-post-list-title').click({ force: true });
        cy.wait(1000);

        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon[title="Settings"]').click();
        cy.wait(1000);

        // Usamos los nombres de etiquetas del mockData
        const tagName1 = randomTag1.tagName;
        const tagName2 = randomTag2.tagName;

        cy.get('div#tag-input').click().type(tagName1 + '{enter}').type(tagName2 + '{enter}');
        cy.wait(1000);

        // Verificamos que las etiquetas se hayan asignado correctamente
        cy.contains(tagName1).should('exist');
        cy.contains(tagName2).should('exist');
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});

