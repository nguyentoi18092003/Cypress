describe('Study intercept',()=>{
  it('Test1',()=>{
    cy.visit("https://www.demoblaze.com/");
    //Intercep default homepage products
    cy.intercept('https://api.demoblaze.com/entries').as('entries')
    cy.wait('@entries')
    cy.get('@entries').then(entries=>{
      let items=entries.response.body.Items
      items.map(item =>{// khong gan gi vao thi sau khi dung map xong no se tu gan lai vao chinh no
        return {
          itemName: item.title.replace('\n',''),
          itemPrice:`$${item.price}`
        }
      })
      cy.log(JSON.stringify(items))// in ra thu tren web
      cy.get('').then(allCardData=>{
        cy.wrap('').then(()=>{
          expect(allCardData).to.be.deep.eq(products);//tức là nó có thể so sánh nguyên một đối tượng à
        })
      })
    })
  })
})

