describe('Sécurité API - accès sans connexion', () => {

  it('GET /orders doit renvoyer 401 ou 403 si non connecté', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      failOnStatusCode: false
    }).then((response) => {
      expect([401, 403]).to.include(response.status)
    })
  })

})