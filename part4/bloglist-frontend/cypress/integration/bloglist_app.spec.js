describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            password: 'salainen',
            name: 'Matti Luukkainen',
            username: 'mluukkai'
          }
        cy.request('POST', 'http://localhost:3003/api/users/', user)  
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in').click()
    })

    describe('Login', function() {
        it('succeeds with corrent credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.contains('Submit').click()
            cy.contains('Matti Luukkainen logged in')
        })

        it.only('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('hehe')
            cy.contains('Submit').click()
            cy.get('.message').contains('wrong username or password')
        })
    })
})