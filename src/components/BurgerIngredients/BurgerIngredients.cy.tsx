import React from 'react'
import BurgerIngredients from './BurgerIngredients'

describe('<BurgerIngredients />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BurgerIngredients />)
  })
})