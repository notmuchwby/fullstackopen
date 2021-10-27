describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in').click()
    })

    describe('Login', function() {
        it.only('succeeds with corrent credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('johhnyboi22')
            cy.get('#password').type('password')
            cy.contains('Submit').click()
            cy.contains('John logged in')
        })
    })
})