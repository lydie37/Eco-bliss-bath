describe('Test du Panier (Front + API)', () => {
  const apiBase = 'http://localhost:8081';
  let userToken;
  const productId = 5; 

  before(() => {
    cy.request({
      method: 'POST',
      url: `${apiBase}/login`,
      body: { username: 'test2@test.fr', password: 'testtest' }
    }).then((res) => {
      expect(res.status).to.eq(200);
      userToken = res.body.token;
    });
  });

  it('Ajout d’un produit au panier et vérifications', () => {
    cy.visit('http://localhost:4200/#/products/5')

    // Vérifier que le stock est supérieur à 1
cy.get('[data-cy="detail-product-stock"]')
  .should(($el) => {
    // Vérifie que le texte contient un chiffre
    expect($el.text()).to.match(/-?\d+/);
  })
  .invoke('text')
  .then((text) => {
    const stock = parseInt(text.match(/-?\d+/)[0], 10);
    expect(stock).to.be.greaterThan(1);

     // Ajouter au panier
        cy.get('[data-cy="detail-product-add"]').click();

        // Vérifier via l'API que le produit est dans le panier
        cy.request({
          method: 'GET',
          url: `${apiBase}/orders`,
          headers: { Authorization: `Bearer ${userToken}` }
        }).then((res) => {
          expect(res.status).to.eq(200);
          const added = res.body.orderLines.find(line => line.product.id === productId);
          expect(added).to.exist;
          expect(added.quantity).to.be.greaterThan(0);
        });

        // Vérifier la présence du stock affiché
        cy.get('[data-cy="detail-product-stock"]').should('exist');
      });
  });
});

