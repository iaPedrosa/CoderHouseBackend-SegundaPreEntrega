import { describe, test } from "node:test";
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";

const apiURLProducts = "http://localhost:3000/api/products/test";
const apiURLCarts = "http://localhost:3000/api/carts";
const apiURLSessions = "http://localhost:3000/api/sessions/current";



describe("TESTS API PRODUCTS", () => {


  test(`[POST & DELETE] api/products/test/:id`, async () => {
 
    const doc = {
           title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.uuid(),
            stock: faker.number.int({ min: 1, max: 100 }),
            price: faker.number.int({ min: 10, max: 500 }),
            status: faker.datatype.boolean(),
            category: faker.commerce.department(),
    };

    const response = await fetch(apiURLProducts, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    });
    const responsePost = await response.json();
    assert.ok(responsePost, "_id");
    const id = responsePost._id;
    const response2 = await fetch(`${apiURLProducts}/${id}`, { method: "DELETE" });
    assert.strictEqual(response2.status, 200);
  });


  describe("TESTS API CARTS", () => {


    test(`[GET ALL] api/carts`, async () => {

      const response = await fetch(apiURLCarts, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  

      assert.strictEqual(response.status, 200);
    });
  });

  describe("TESTS API SESSIONS", () => {


    test(`[GET ALL] /api/sessions/current`, async () => {

      const response = await fetch(apiURLSessions, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  

      assert.strictEqual(response.status, 404);
    });
  });
    
  
});
