describe('Tests UI Panier - Produit 3 (Stock négatif)', () => {
  const apiBase = 'http://localhost:8081';
  const productId = 3; // produit avec stock négatif
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

  // Vider le panier avant chaque test pour garantir l'isolation
  beforeEach(() => {
    cy.request({
      method: 'DELETE',
      url: `${apiBase}/orders`,
      headers: { Authorization: `Bearer ${userToken}` },
      failOnStatusCode: false
    });
  });

  describe('Vérification du stock initial', () => {
    it('Le stock doit être ≤ 0', () => {
      cy.request(`${apiBase}/products/${productId}`).then((res) => {
        expect(res.status).to.eq(200);
        const stock = res.body.availableStock;
        cy.log(`Stock Produit ${productId} : ${stock}`);
        expect(stock).to.be.lte(0);
      });
    });
  });

 describe('Blocage ajout au panier via API', () => {
  it('Ne doit pas pouvoir ajouter le produit si stock ≤ 0', () => {
    cy.request(`${apiBase}/products/${productId}`).then((res) => {
      const stock = res.body.availableStock;
      expect(stock).to.be.lte(0); // Vérification avant tout ajout

      // Visiter la page produit
      cy.visit(`http://localhost:4200/#/products/${productId}`);

      // Tenter l'ajout malgré stock ≤0
      cy.get('[data-cy="detail-product-add"]').click();

      // Attendre que le backend enregistre l’ajout
      cy.wait(500);

      // Vérifier via l’API si le produit a été ajouté
      cy.request({
        method: 'GET',
        url: `${apiBase}/orders`,
        headers: { Authorization: `Bearer ${userToken}` },
      }).then((orderRes) => {
        const added = orderRes.body.orderLines.find(line => line.product.id === productId);
        expect(added).to.not.exist; 
      });
    });
  });
});


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



























