export default class DemoBlazePage{
    _getCardDetails(){//dau _ bieu thi private
        let cardData={};
        cy.get('h4').then($title=> cardData.itemName=$title.text().trim())
        cy.get('h5').then($price=> cardData.itemPrice=$price.text().trim())
        return new Cypress.Promise(resolve=>resolve(cardData));//resolve, reject
    }
    getAllCardData(){
        let allCardData=[];
        cy .get(".card").each($card=>{ //cho $ dang truoc de danh dau no la jQuery thoi, kieu convention
            cy.wrap($card).within(()=>{
                // let itemName,itemPrice;
                // cy.get('h4').then($title=> itemName=$title.text().trim())
                // cy.get('h5').then($price=> itemPrice=$price.text().trim())
                // allCardData.push({itemName,itemPrice});
                this._getCardDetails().then(cardData=> allCardData.push(cardData))
            })
        })
        return new Cypress.Promise(resolve=>{
            cy.wrap('').then(()=>resolve(allCardData));
        })
    }

}