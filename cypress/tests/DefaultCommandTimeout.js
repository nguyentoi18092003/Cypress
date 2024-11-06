describe('Custom thời gian chờ ',function(){
    it('Chay thu',function(){
        cy.visit("https://the-internet.herokuapp.com/login")
        cy.get("#username",{timeout:10000}).type("username1");// set thoi gian cho mot phan tu

    })
})

describe('Custom thời gian chờ ',function(){
    it('Chay thu',{defaultCommandTimeout:10000},function(){// set thoi gian cho ca cai test
        cy.visit("https://the-internet.herokuapp.com/login")
        cy.get("#username").clear().type("username2");

    })
})

describe('Custom thời gian chờ ',{defaultCommandTimeout:10000},function(){// set thoi gian cho ca cai suit,1 suit gom nhieu test(it..)
    it('Chay thu',function(){
        cy.visit("https://the-internet.herokuapp.com/login")
        cy.get("#username").clear().type("username3");

    })
    it('Chay thu',function(){
        cy.visit("https://the-internet.herokuapp.com/login")
        cy.get("#username").clear().type("username4");

    })
    it('chay thu3', ()=>{
        cy.visit("https://the-internet.herokuapp.com/");
        cy.get("a[href='/dynamic_content']").click();
        cy.location('pathname',{timout:500}).should("eq","/dynamic_content")//.should("eq", "/dynamic_content"): Lệnh này kiểm tra xem pathname của URL có bằng "/dynamic_content" hay không.
        //Noi don gian la ktra xem no redirect den trang do chua
    })
})
//viec custom o ngoai giong nhu implicitWait, con vao tung phan tu mot thi no giong explicitwait trong selenium
//con muon apply cho ca project vao cypess.config.js
// cho cau lenh defaultCommandTimeout:10000
// thi tat ca cac suit trong du an deu ap dung thoi gian nay