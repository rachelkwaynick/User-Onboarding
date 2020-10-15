describe('Form App', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3001/')
    })

    const nameInput = () => cy.get('input[name="name"]')
    const emailInput = () => cy.get('input[name="email"]')
    const passwordInput = () => cy.get('input[name="password"]')
    const termsInput = () => cy.get('input[name="terms"]')
    const submitBtn = () => cy.get('button')
    const form = () => cy.get('form')
    const errorDiv = () => cy.get('#errors')
    const errorName = () => cy.get('.nameError')

    it('sanity checks', () => {
        expect(5).to.equal(5)
    })

    it('get the Name input and type a name in it', () => {
        nameInput()
            .should('exist')
            .should('have.value', '')
            .type('Name')
            .should('have.value', 'Name')
            .clear()
    })

    it('get the Email input and type an email address in it', () => {
        emailInput()
            .should('exist')
            .should('have.value', '')
            .type('email@email.com')
            .should('have.value', 'email@email.com')
            .clear()
    })

    it('get the Password input and type a password in it', () => {
        passwordInput()
            .should('exist')
            .should('have.value', '')
            .type('asdf')
            .should('have.value', 'asdf')
            .clear()
    })

    it('get the Terms input and check it', () => {
        termsInput()
            .should('exist')
            .should('not.be.checked')
            .check()
            .should('be.checked')
            .uncheck()
    })

    it('submit the form data when all is entered', () => {
        nameInput().type('name')
        emailInput().type('email@email.com')
        passwordInput().type('asdf')
        termsInput().check()
        submitBtn().click()
    // How to check that submit was successful?

    })

    it('form validation appears without required input', () => {
        nameInput().type(' ').clear()

        errorName().should('have.value', 'name is required')
    })
})