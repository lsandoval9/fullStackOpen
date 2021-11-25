const newUser = {
  username: 'ArtoHellas',
  password: '1234'
}


describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')



    cy.request('POST', 'http://localhost:3003/api/users', newUser)

    cy.visit('http://localhost:3000')
  })

  it('should render the login form by default', () => {

    cy.contains('Log in to application')

    cy.get('#username-input')

    cy.get('#password-input')

    cy.get('#login-button')

  })


  describe('Login', () => {

    it('Should allow login by an user with valid credentials', () => {
      cy.get('#username-input').type('ArtoHellas')
      cy.get('#password-input').type('1234')
      cy.get('#login-button').click()

      cy.contains('User logged in')

    })

    it('Should not allow login by an user with invalid credentials', () => {

      cy.get('#username-input').type('John Connor')
      cy.get('#password-input').type('Skynet')
      cy.get('#login-button').click()

      cy.get('#notification')
        .and('have.css', 'border', '1px solid rgb(255, 0, 0)')

      cy.contains('Wrong username or password')

    })


    describe('When logged in', () => {

      beforeEach(() => {

        cy.login(newUser.username, newUser.password)

      })

      it('Should allow create a new blog by an authenticated user', () => {


        cy.get('#create-blog-button').click()

        cy.get('#title').type('my awesome blog')

        cy.get('#author').type('lsandoval9')

        cy.get('#url').type('#url')

        cy.get('#submit-blog').click()

        cy.get('#cancel-button').click()

        cy.contains('my awesome blog lsandoval9')

      })


      it('Should allow like a blog by an authenticated user', () => {

        const exampleBlog = {
          author: 'Mike James',
          url: 'mike.dev',
          title: 'Programming for dummies'
        }

        cy.get('#create-blog-button').click()


        cy.createBlog(exampleBlog)

        cy.get('#cancel-button').click()


        cy.get('#details-button').click()

        cy.get('#like-button').click()

        cy.get('#likes').contains('likes: 1')

      })

      it('Should allow delete a blog by an authenticated user', () => {
          
        const exampleBlog = {
            author: 'Mike James',
            url: 'mike.dev',
            title: 'Programming for dummies'
          }

          cy.get('#create-blog-button').click()

  
          cy.createBlog(exampleBlog)
  
          cy.get('#cancel-button').click()

          cy.get('#delete-button').click()

          cy.get('.blog').should('not.exist');

      });

      it.only('Should order blogs by number of likes', () => {
          
        const exampleBlogs = [{
            author: 'Mike James',
            url: 'mike.dev',
            title: 'Programming for dummies'
          },
          {
              author: "Tommy tomassi",
              url: "tomdev.com",
              title: "learning functional programming with Tommy"
          },
          {
              author: "Ivan Melkovic",
              url: "awesomereactblog.dev",
              title: "Redux: the easy way"
          }
        
        ]

        cy.get('#create-blog-button').click()

        exampleBlogs.map(blog => {

            


            cy.createBlog(blog)

            cy.wait(300);

            

        })

        cy.get("#cancel-button").click()

        // 3 likes to Mike's blog

        cy.contains("Programming for dummies Mike James").parent().find("#details-button").click()

        cy.contains("Programming for dummies Mike James").parent().find("#like-button").click().click().click()

        cy.contains("Programming for dummies Mike James").get("#details-button").click()


        // 1 like to Tommy's blog
        cy.contains("learning functional programming with Tommy Tommy tomassi").parent().find("#details-button").click()

        cy.wait(200);
        cy.contains("learning functional programming with Tommy Tommy tomassi").parent().find("#like-button").click()

        cy.contains("learning functional programming with Tommy Tommy tomassi").get("#details-button").click()


        // Show details for Ivan's post

        cy.contains("Redux: the easy way Ivan Melkovic").parent().find("#details-button").click()

        cy.get(".blog").then((blogs) => {

            // The first element must be 3
            // the second one 1
            // the last one 0

            cy.wrap(blogs[0]).contains("likes: 3")

            cy.wrap(blogs[1]).contains("likes: 1")

            cy.wrap(blogs[2]).contains("likes: 0")

        })

      });
    })

  })

})