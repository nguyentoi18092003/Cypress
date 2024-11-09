import DemoBlazePage from "../model/pages/DemoBlazePage";
import product from "../fixtures/product.json";
describe('SR HomePage',()=>{
    it ('should be able to get hero card title',()=>{
        let dataJson=[]
        cy.fixture('product').then((data)=>{
            dataJson=data;
        })
        cy .visit("https://www.demoblaze.com/");
        new DemoBlazePage().getAllCardData().then(allCardData=>{
            cy.wrap('').then(()=>{
                cy.log(JSON.stringify(allCardData));
               expect(dataJson).to.be.deep.eq(allCardData)
            })
        })
    })
})