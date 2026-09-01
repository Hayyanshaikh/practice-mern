const test = require("node:test");
const assert = require("node:assert/strict");
const Product = require("../../models/Product");

test("accepts a valid product", async () => {
  const product = new Product({
    name: "Notebook",
    description: "A ruled paper notebook",
    price: 12.5,
    quantity: 10,
  });

  await product.validate();
});

test("rejects invalid product inventory values", async () => {
  const product = new Product({
    name: "Notebook",
    description: "A ruled paper notebook",
    price: -1,
    quantity: 1.5,
  });

  await assert.rejects(product.validate(), (error) => {
    assert.ok(error.errors.price);
    assert.ok(error.errors.quantity);
    return true;
  });
});
