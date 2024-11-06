const DROPDOWN_SEL="select[id='dropdown']";
describe('Dropdown handling',()=>{
    it('Test 1',()=>{
        //Visit  the page
        cy .visit("https://the-internet.herokuapp.com/dropdown")

        //select by index| select Option 1
        cy.get("select option:selected").invoke("text").should("eq","Option 1");
        //select by value | select Option 2 (o day co thuoc tinh value)
        cy.get(DROPDOWN_SEL).select("2");
        //select by visible text |select Option 1
        cy.get(DROPDOWN_SEL).select("Option 1");

        //Verify the selected option is now Option 1
        cy.get("select option:selected").invoke("text").should("eq","Option 1");
    })
})