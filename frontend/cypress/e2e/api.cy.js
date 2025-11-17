describe('Tests API Eco-Bliss Bath', () => {

  const apiBase = 'http://localhost:8081';
  let userToken; // pour stocker le token après login

  // Login avant les tests nécessitant auth
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
      userToken = res.body.token; // récupère le token
    });
  });

  // Accès sans connexion
  describe('Accès sans connexion', () => {
    it('GET /orders doit renvoyer 401 ou 403 si non connecté', () => {
      cy.request({
        method: 'GET',
        url: `${apiBase}/orders`,
        failOnStatusCode: false
      }).then((response) => {
        expect([401, 403]).to.include(response.status);
      });
    });
  });

  // Liste des produits du panier
  describe('Retourner la liste des produits du panier', () => {
    it('GET /orders doit renvoyer les produits du panier', () => {
      cy.request({
        method: 'GET',
        url: `${apiBase}/orders`,
        headers: { Authorization: `Bearer ${userToken}` }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('orderLines').that.is.an('array');

        response.body.orderLines.forEach(orderLine => {
          expect(orderLine).to.have.property('product');
          expect(orderLine.product).to.include.keys(
            'id',
            'name',
            'description',
            'price',
            'picture'
          );
        });
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
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.include.keys(
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

  // Ajouter un produit au panier
  describe('Ajouter un produit au panier', () => {
    it('POST /orders/add produit disponible', () => {
      cy.request({
        method: 'POST',
        url: `${apiBase}/orders/add`,
        headers: { Authorization: `Bearer ${userToken}` },
        body: {
          productId: 1, // ID du produit disponible
          quantity: 1
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('POST /orders/add produit en rupture de stock', () => {
      cy.request({
        method: 'POST',
        url: `${apiBase}/orders/add`,
        headers: { Authorization: `Bearer ${userToken}` },
        failOnStatusCode: false,
        body: {
          productId: 999, // ID d’un produit en rupture 
          quantity: 1
        }
      }).then((res) => {
        expect([400, 404]).to.include(res.status);
      });
    });
  });

  // Ajouter un avis
  describe('Ajouter un avis', () => {
    it('POST /reviews', () => {
      cy.request({
        method: 'POST',
        url: `${apiBase}/reviews`,
        headers: { Authorization: `Bearer ${userToken}` },
        body: {
          title: "Avis test",
          comment: "Super produit !",
          rating: 5
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });

});