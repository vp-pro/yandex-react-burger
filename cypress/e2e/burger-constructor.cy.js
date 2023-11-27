import {url} from "../../src/utils/api"

/* eslint-disable no-undef */
describe('Home', () => {

    beforeEach(()=> {
      cy.visit('http://localhost:3000/');

      cy.intercept("GET", url.ingredients, {fixture: "ingredients"})
      cy.intercept("GET", url.user, { fixture: "user" });
      cy.intercept("POST", url.orders, { fixture: "order" }).as("postOrder");

      window.localStorage.setItem(
        "refreshToken",
        JSON.stringify("test-refreshToken")
      );
      window.localStorage.setItem(
        "accessToken",
        JSON.stringify("test-accessToken")
      );
    })


    it('should click and close bun and ingredient', function (){
          //Почему-то иногда не тригерится???
      cy.get('[data-testid="bun_card"]').first().click({force: true})
      cy.wait(1000)
      cy.get('[data-testid="close_modal_button"]').click();

      cy.get('[data-testid="ingredient_card"]').first().click({force: true})
      cy.wait(1000)
      cy.get('[data-testid="close_modal_button"]').click();
    });

    it('should DnD and order', function (){

      cy.get('[data-testid="bun_card"]').first().as('draggedBun');
      cy.get('[data-testid=ingredient_card]').first().as('draggedIngredient');
      cy.get('[data-testid="constructor-drop-area"]').as('dropArea');

      cy.get('[data-testid="bun_card"]').first().trigger('dragstart');
      cy.get("@dropArea")
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })
      .wait(50)
      .trigger('dragend', { force: true });

      cy.get('[data-testid="bun_card"]').last().trigger('dragstart');
      cy.get("@dropArea")
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })
      .wait(50)
      .trigger('dragend', { force: true });


      cy.get('[data-testid="ingredient_card"]').first().trigger('dragstart');
      cy.get("@dropArea")
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })
      .wait(50)
      .trigger('dragend', { force: true });


      cy.get('[data-testid="ingredient_card"]').eq(5).trigger('dragstart');
      cy.get("@dropArea")
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })
      .wait(50)
      .trigger('dragend', { force: true });

      cy.get('[data-testid="ingredient_card"]').last().trigger('dragstart');
      cy.get("@dropArea")
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })
      .wait(50)
      .trigger('dragend', { force: true });

      cy.get('button').contains('Оформить заказ').click();

      cy.get("[data-testid=order-number]").contains("123").should("exist");
 });
});


