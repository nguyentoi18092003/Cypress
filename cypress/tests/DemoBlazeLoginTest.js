import DemoBlazePage from "../model/pages/DemoBlazePage"
import { HomePageUI } from "../support/HomPageApi"
describe('DemoBlaze Home Page Test',()=>{
    let apiProduct;
    beforeEach(()=>{
        cy .login('tun','admin')
        cy.visit('https://www.demoblaze.com')
        //HomePageApi.getHomePageProducts().then(entries=> apiProduct=entries)
        HomePageUI.getHomePageProducts().then(entries=> apiProduct=entries)
    })
    
    it ('should be able to login by using API',()=>{
        cy.log(apiProduct)
        let apiProductData =apiProduct.response.body.Items.map(item=>{
            return {
                itemName: item.title.replace('\n',''),
                itemPrice:`$${item.price}`
            }
        })
        cy.log("a")
        new DemoBlazePage().getAllCardData().then(allCardData=>{
            cy.wrap('').then(()=>{
                expect(allCardData).to.be.deep.eq(apiProductData);
            })
        })
    })
})