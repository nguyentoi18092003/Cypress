import DemoBlazePage from "../model/pages/DemoBlazePage";
import { HomePageUI } from "../support/HomPageApi";
describe('Study intercept',()=>{
    let apiProduct
    beforeEach(()=>{
        cy.visit('https://www.demoblaze.com/')
        HomePageUI.getHomePageProducts().then(entries=>apiProduct=entries)
    })
  it('Test1',()=>{
    
      let apiProductData=apiProduct.response.body.Items.map(item=>{
        return {
            itemName: item.title.replace('\n',''),
            itemPrice:`$${item.price}`
          }
      })
      cy.log(JSON.stringify(apiProduct))// in ra thu tren web
      new DemoBlazePage().getAllCardData().then(allCardData=>{
        cy.wrap('').then(()=>{
          expect(allCardData).to.be.deep.eq(apiProductData);//tức là nó có thể so sánh nguyên một đối tượng à
        })
      })
    })
  })


