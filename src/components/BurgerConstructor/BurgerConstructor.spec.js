describe('BurgerConstructor', () => {
    beforeEach(() => {
      // This code runs before each test
      cy.visit('http://localhost:3000'); // Change the URL to match your development server
    });
  
    it('should display loading message', () => {
      cy.contains('Loading...').should('exist');
    });
  
    it('should display message when no bun is selected', () => {
      cy.contains('Пожалуйста, перенесите сюда булку').should('exist');
    });
  
    it('should select bun and display ingredients', () => {
      // Add Cypress commands to interact with your UI
      // For example, you can use cy.get() to select elements and cy.click() to perform clicks
      cy.get('.bun-selector').drag('.bun-container'); // Example, adjust based on your UI structure
      cy.contains('Tomato').should('exist');
    });
  
    it('should open modal and submit order', () => {
      // Add Cypress commands to interact with your UI
      // For example, you can use cy.get() to select elements and cy.click() to perform clicks
      cy.get('.order-button').click(); // Example, adjust based on your UI structure
  
      // Validate modal is open
      cy.get('.modal').should('exist');
  
      // Add commands to interact with the modal and submit the order
      cy.get('.submit-order-button').click();
      cy.contains('Your order is confirmed').should('exist');
    });
  });
  