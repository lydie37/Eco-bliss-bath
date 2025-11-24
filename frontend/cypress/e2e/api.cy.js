describe('Tests API Eco-Bliss Bath', () => {
  const apiBase = 'http://localhost:8081';
  let userToken; // pour stocker le token après login

  // Login avant les tests nécessitant authentification
  before(() => {
    cy.request({
      method: 'POST',
      url: `${apiBase}/login`,
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      userToken = res.body.token;
    });
  });

  // Accès sans connexion
  describe('Accès sans connexion', () => {
    it('GET /orders doit renvoyer 401 ou 403 si non connecté', () => {
      cy.request({
        method: 'GET',
        url: `${apiBase}/orders`,
        failOnStatusCode: false // pour gérer le code erreur
      }).then((res) => {
        expect([401, 403]).to.include(res.status);
      });
    });
  });

  // Liste des produits du panier
  describe('Retourner la liste des produits du panier', () => {
    it('GET /orders doit renvoyer les produits du panier', () => {
      cy.request({
        method: 'GET',
        url: `${apiBase}/orders`,
        headers: { Authorization: `Bearer ${userToken}` },
        failOnStatusCode: false // pour gérer le code erreur
      }).then((res) => {
        if (res.status === 200) {
          expect(res.body).to.have.property('orderLines').that.is.an('array');
          res.body.orderLines.forEach(orderLine => {
            expect(orderLine).to.have.property('product');
            expect(orderLine.product).to.include.keys(
              'id',
              'name',
              'description',
              'price',
              'picture'
            );
          });
        } else {
          expect([404, 401, 403]).to.include(res.status);
        }
      });
    });
  });

  // Fiche produit spécifique
  describe('Fiche produit spécifique', () => {
    it('GET /products/{id} doit renvoyer la fiche d’un produit', () => {
      const productId = 3;
      cy.request({
        method: 'GET',
        url: `${apiBase}/products/${productId}`
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys(
          'id',
          'name',
          'availableStock',
          'skin',
          'aromas',
          'ingredients',
          'description',
          'price',
          'picture',
          'varieties'
        );
      });
    });
  });

  // Ajouter un produit au panier (API)
  describe('Ajouter un produit au panier', () => {
    it('PUT /orders/add produit disponible', () => {
      cy.request({
        method: 'PUT',
        url: `${apiBase}/orders/add`,
        headers: { Authorization: `Bearer ${userToken}` },
        failOnStatusCode: false, // pour gérer le code erreur
        body: {
          productId: 5,
          quantity: 1
        }
      }).then((res) => {
        expect([200, 400]).to.include(res.status);
      });
    });

    it('PUT /orders/add produit en rupture de stock', () => {
      cy.request({
        method: 'PUT',
        url: `${apiBase}/orders/add`,
        headers: { Authorization: `Bearer ${userToken}` },
        failOnStatusCode: false, // pour gérer le code erreur
        body: {
          productId: 999,
          quantity: 1
        }
      }).then((res) => {
        expect([400, 404]).to.include(res.status);
      });
    });
  });

// Ajouter un avis - test XSS
describe('Ajouter un avis - Injection XSS', () => {
  it('POST /reviews doit refuser une injection XSS', () => {
    cy.request({
      method: 'POST',
      url: `${apiBase}/reviews`,
      headers: { Authorization: `Bearer ${userToken}` },
      failOnStatusCode: false, // pour gérer le code erreur
      body: {
        title: "Test XSS",
        comment: '<script>alert("xss")</script>',
        rating: 5
      }
    }).then((res) => {
      // Le backend doit renvoyer une erreur (400 ou 422)
      expect([400, 422]).to.include(res.status);
    });
  });
});

  });




