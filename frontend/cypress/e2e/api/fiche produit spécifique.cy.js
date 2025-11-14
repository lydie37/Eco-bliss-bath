describe('Sécurité API - fiche produit spécifique', () => {

  it('GET /products/{id} doit renvoyer la fiche d’un produit', () => {

    const productId = 3; // ID du produit à tester

    cy.request({
      method: 'GET',
      url: `http://localhost:8081/products/${productId}`
    }).then((response) => {

      // Vérifie que la requête a réussi
      expect(response.status).to.eq(200);

      // Vérifie que la réponse est un objet
      expect(response.body).to.be.an('object');

      // Vérifie les propriétés principales
      expect(response.body).to.have.property('id', productId);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('availableStock');
      expect(response.body).to.have.property('skin');
      expect(response.body).to.have.property('aromas');
      expect(response.body).to.have.property('ingredients');
      expect(response.body).to.have.property('description');
      expect(response.body).to.have.property('price');
      expect(response.body).to.have.property('picture');
      expect(response.body).to.have.property('varieties');

    });

  });

});