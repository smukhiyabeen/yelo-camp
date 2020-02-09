describe('Homepage', () => {

  beforeEach( () => {
    cy.visit('/');
  })
  
  it('should go to /campgrounds when clicking \'View All Campgrounds\' button', () => {
    cy.contains('View All Campgrounds').click();
    
    cy.url().should('include', '/campgrounds');

    cy.get('.container > header')
      .should('have.contain', 'Welcome to Yelp Camp!');

    cy.get('.campCard')
      .should(($card) => {
        expect($card).length.to.be.greaterThan(2)
    })
  }); 

  it('should have the title \'Welcome to YelpCamp!\'', () => {
    cy.get('[data-header=landingTitle]')
      .should('contain', 'Welcome to YelpCamp!');
  });  
});
