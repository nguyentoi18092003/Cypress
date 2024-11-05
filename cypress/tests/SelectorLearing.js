describe('Element interaction', ()=>{
    // Dau tien la cai spin, muon test cai gi o trong nay
    it('should be able to complete the form',()=>{
        //Open the login form page
        cy.visit("/login");//Ket hop vs cai duong dan dang truoc mk config sna nua, no se mo ra trang nay

       //Find username by ID then input the text
       cy.get("#username").type("tomsmith");
       // find password by attribute name then inout the text
       cy.get("[name='password']").type("SuperSecretPassword!");
       // find login btn by attribute and tag name then click
       cy.get("button[type='submit']").click();
       //Debug purpose 
       cy.wait(5000);
    })
})