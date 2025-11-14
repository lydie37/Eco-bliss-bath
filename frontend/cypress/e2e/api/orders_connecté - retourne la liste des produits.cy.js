describe('Sécurité API - retourner la liste des produits du panier', () => {

  it('GET /orders doit renvoyer les produits du panier', () => {

    // Token à remplacer avant chaque test
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NjMxMTEwMDQsImV4cCI6MTc2MzExNDYwNCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdDJAdGVzdC5mciJ9.LaJM0oVwApQarhzH1XM9O-qRRMk_NP6wZNkem1E8WGmuu1m9Ya_AklgSnoWyWAxcEXGCm3dkSCnGz7pNhe5CtZcrMIQAurWrR3rDgv_-il00SmbhrRAzxV9NWAz-yEMMHbS2FuRwYh3v7OuhjA5rsMdqZUGRLy-nn1zM1AkLOs0LSD_hvarMUU1p-rKGIBGbVMKgtjckzjz72S3_3Ydnedq5DsQMMTb2jyk0_OuF61vpaIlje9B2HNvpb2tYcU9tWMjdeJHPQPY4fSbc3pyRMNuQfy_LsTwU4xofRxrcwYBOZUOU1JwBBvuVCBw9XbC1d9tnTMa0Lu6YsgEOQ8sShA';

    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {

      //Vérifie que la requête a réussi
      expect(response.status).to.eq(200);

      //Vérifie qu'il contient bien un tableau "products"
      expect(response.body).to.have.property('products');
      expect(response.body.products).to.be.an('array');

      //Vérifie chaque produit du tableau
      response.body.products.forEach(product => {
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
        expect(product).to.have.property('availableStock');
        expect(product).to.have.property('skin');
        expect(product).to.have.property('aromas');
        expect(product).to.have.property('ingredients');
        expect(product).to.have.property('description');
        expect(product).to.have.property('price');
        expect(product).to.have.property('picture');
        expect(product).to.have.property('varieties');
      });

    });

  });

});
