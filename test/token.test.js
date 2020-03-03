const DAE = artifacts.require("DAE");
let catchRevert = require("./exceptionsHelpers.js").catchRevert;

// TOKEN DETAILS
const MAX_SUPPLY = 420e6; // (four hundred twenty million)
const INITIAL_SUPPLY = 4200000; // (four point two million)
const NAME = "Drachmae";
const SYMBOL = "DAE";
const DECIMALS = 4;

contract("DAE Token", ([owner, user1, user2, random]) => {
  let dae;

  beforeEach(async () => {
    dae = await DAE.new();
  });

  describe.only("Token::Deployment", () => {
    it("Correct Name", async () => {
      const name = await dae.name();
      assert.equal(name, NAME, "incorrect name");
    });

    it("Correct Symbol", async () => {
      const symbol = await dae.symbol();
      assert.equal(symbol, SYMBOL, "incorrect symbol");
    });

    it("Correct Decimals", async () => {
      let x = await dae.decimals();
      assert.equal(x.toNumber(), DECIMALS, "incorrect decimals");
    });

    it("Correct Initial Supply", async () => {
      let initialSupply = await dae.totalSupply();
      initialSupply = initialSupply.toString() / 10 ** DECIMALS;
      assert.equal(initialSupply, INITIAL_SUPPLY, "incorrect initial supply");
    });

    it("Correct Max Supply", async () => {
      let totalSupply = await dae.cap();
      totalSupply = totalSupply.toString() / 10 ** DECIMALS;
      assert.equal(totalSupply, MAX_SUPPLY, "incorrect initial supply");
    });
  });
});
