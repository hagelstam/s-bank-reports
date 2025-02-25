describe('Home page', () => {
  it('should have heading text', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h1').contains('S-Bank Reports');
  });
});
