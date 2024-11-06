describe('Run file MutipleMatching',function(){
    it('Run 1 hehe',function(){
        cy.visit("/login");
        //use eq
         cy.get("input").eq(0).type("tomsmith");// Cai nay no se ra list element, eq(0) lay ra cai phan tu co chi so 0 de tuong tac
         cy.get("input").eq(1).type("SuperSecretPassword!");// Cai nay no se ra list element, eq(0) lay ra cai phan tu co chi so 0 de tuong tac
        //cy.get("button[type='submit']").click();

        //Use closure
        cy.get("input").then(items=>{//items=>{} la arrow function
            cy.get(items[0]).clear()
            cy.get(items[0]).type("tomsmith")
            cy.get(items[1]).clear();
            cy.get(items[1]).type("SuperSecretPassword!")
        })
        //cy.get("button[type='submit']").click();

        //Use .each: duyệt qua mảng
        cy.get("input").each((item,index)=>{
            cy.get(item).clear().type("aba");
        });
        //cy.get("button[type='submit']").click();
        cy.wait(5000);
    });
});