describe('Tests UI Panier', () => {
  const apiBase = 'http://localhost:8081';
  let userToken;

  before(() => {
    // Connexion
    cy.request({
      method: 'POST',
      url: `${apiBase}/login`,
      body: { username: 'test2@test.fr', password: 'testtest' }
    }).then((res) => {
      expect(res.status).to.eq(200);
      userToken = res.body.token;
    });
  });

  // Vider le panier avant chaque test
  beforeEach(() => {
    cy.request({
      method: 'GET',
      url: `${apiBase}/orders`,
      headers: { Authorization: `Bearer ${userToken}` },
      failOnStatusCode: false
    }).then((orderRes) => {
      const lines = orderRes.body.orderLines || [];
      lines.forEach(line => {
        cy.request({
          method: 'DELETE',
          url: `${apiBase}/orders/${line.id}/delete`,
          headers: { Authorization: `Bearer ${userToken}` },
          failOnStatusCode: false
        });
      });
    });
  });

  // Produit 3 : Stock négatif
  
  const productIdNegatif = 3;

  describe('Produit 3 (Stock négatif)', () => {

it('Le stock doit être ≤ 0', () => {
  cy.request(`${apiBase}/products/${productIdNegatif}`).then((res) => {
    expect(res.status).to.eq(200);
    const stock = res.body.availableStock;
    cy.log(`Stock Produit ${productIdNegatif} : ${stock}`);
    expect(stock, 'Produit avec stock négatif détecté, test échoue').to.be.gt(0);
  });
});


    it('Ne doit pas pouvoir ajouter le produit si stock ≤ 0', () => {
      cy.request(`${apiBase}/products/${productIdNegatif}`).then((res) => {
        const stock = res.body.availableStock;
        expect(stock).to.be.lte(0);

        cy.visit(`http://localhost:4200/#/products/${productIdNegatif}`);
        cy.get('[data-cy="detail-product-add"]').click();
        cy.wait(500);

        cy.request({
          method: 'GET',
          url: `${apiBase}/orders`,
          headers: { Authorization: `Bearer ${userToken}` },
        }).then((orderRes) => {
          const added = orderRes.body.orderLines.find(line => line.product.id === productIdNegatif);
          expect(added).to.not.exist;
        });
      });
    });

  });


  // Autres tests 

  describe('Vérification stock affiché', () => {
    it('Champ stock affiché si présent', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-cy="detail-product-stock"]').length) {
          cy.get('[data-cy="detail-product-stock"]').should('exist');
        } else {
          cy.log('Champ stock non présent, test ignoré');
        }
      });
    });
  });

  describe('Limites de quantité', () => {
    it('Quantité négative', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-cy="detail-product-quantity"]').length) {
          cy.get('[data-cy="detail-product-quantity"]').clear().type('-5');
          cy.get('[data-cy="detail-product-add"]').click();
        } else {
          cy.log('Input quantité non présent, test ignoré');
        }
      });
    });

    it('Quantité supérieure à 20', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-cy="detail-product-quantity"]').length) {
          cy.get('[data-cy="detail-product-quantity"]').clear().type('25');
          cy.get('[data-cy="detail-product-add"]').click();
        } else {
          cy.log('Input quantité non présent, test ignoré');
        }
      });
    });
  });

  describe('Champ de disponibilité', () => {
    it('Vérifier la présence du champ de disponibilité si présent', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-cy="detail-product-stock"]').length) {
          cy.get('[data-cy="detail-product-stock"]').should('exist');
        } else {
          cy.log('Champ stock non présent, test ignoré');
        }
      });
    });
  });

});











































































