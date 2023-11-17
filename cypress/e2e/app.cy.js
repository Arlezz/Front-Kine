describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should display the title', () => {
    cy.get('h1').should('contain', 'Kineverso');
  });

});