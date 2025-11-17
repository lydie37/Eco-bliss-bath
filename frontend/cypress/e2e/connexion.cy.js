describe('Test de connexion (Front)', () => {

  it('Doit permettre à un utilisateur de se connecter', () => {

    // Aller sur le site
    cy.visit('http://localhost:4200');

    // Cliquer sur le bouton Connexion
    cy.contains('Connexion').click();

    // Vérifier que le formulaire s'affiche
    cy.get('form').should('be.visible');

    // Vérifier les champs avec data-cy
    cy.get('[data-cy="login-input-username"]').should('exist');
    cy.get('input[formControlName="password"]').should('exist'); 

    // Entrer l’email et le mot de passe
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('input[formControlName="password"]').type('testtest');

    // Soumettre le formulaire
    cy.get('form').submit();

    // Vérifier que l’utilisateur est connecté
    cy.contains('Mon panier').should('be.visible');
  });

});
