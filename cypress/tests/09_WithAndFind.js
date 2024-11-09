describe('Learning about within and find methods', () => {
    it.only('within method', () => {
      // .only là cách để chỉ chạy một bài test duy nhất
      cy.visit('https://www.simplyrecipes.com/');  // Thêm dấu chấm phẩy sau cy.visit()
      cy.get('.showcase__hero').within(() => {
        cy.get('.card__title');
      });
    });
  
    it('find method', () => {
      // Phương thức find sẽ được thực hiện sau
      cy.visit('https://www.simplyrecipes.com/');
      cy.get('.showcase__hero').find('.card__title').click();
    });
  });
  