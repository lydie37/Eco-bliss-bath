describe('Smoke tests', () => {

  const baseUrl = 'http://localhost:4200';

  it('Vérifier la présence des champs et bouton de connexion', () => {
    // Aller sur la page login
    cy.visit(`${baseUrl}/#/login`);

    // Vérifier les champs
    cy.get('[data-cy="login-input-username"]', { timeout: 10000 }).should('exist');
    cy.get('input[formControlName="password"]').should('exist');

    // Vérifier le bouton de connexion
    cy.get('[data-cy="login-submit"]').should('exist'); 
  });

  it('Vérifier la présence des boutons d’ajout au panier après connexion', () => {
    // Connexion
    cy.visit(`${baseUrl}/#/login`);
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('input[formControlName="password"]').type('testtest');
    cy.get('[data-cy="login-submit"]').click();

    // Vérifier qu’un produit a le bouton Ajouter au panier
    cy.visit(`${baseUrl}/#/products/5`);
    cy.get('[data-cy="detail-product-add"]', { timeout: 10000 }).should('exist');
  });

});



