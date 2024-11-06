
const CHECKBOXES_SEL="[type='checkbox']";
describe('Handling checkboxes',()=>{
    it('test 1',()=>{
        cy.visit("/checkboxes");
        //try to unselect the second checkbox
        cy.get(CHECKBOXES_SEL).eq(1).click();

        //Vrify all checkboes are unselected
        cy.get(CHECKBOXES_SEL).filter(":not([checked])").should("have.length",2);
        //Loop over all checkeboxes agaim then select all
        cy.get(CHECKBOXES_SEL).filter(":not([checked])").then(item=>{
            cy.get(item).click({multiple: true})
        })
       


    })
})