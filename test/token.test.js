const DAE = artifacts.require("DAE");
let catchRevert = require("./exceptionsHelpers.js").catchRevert;

// TOKEN DETAILS
const MAX_SUPPLY = 420e6; // (four hundred twenty million)
const INITIAL_SUPPLY = 4200000; // (four point two million)
const NAME = "Drachmae";
const SYMBOL = "DAE";
const DECIMALS = 4;

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const NEW_MINTER = "0x1cAb97Def5fb15a965E875765Fce94073CB980C4";

contract("DAE Token", ([owner, user1, user2, user3, random]) => {
  let dae;

  const getLastEvent = async eventName => {
    const events = await dae.getPastEvents(eventName, {
      fromBlock: 0,
      toBlock: "latest"
    });
    return events.pop().returnValues;
  };

  beforeEach(async () => {
    dae = await DAE.new();
  });

  describe("Token::Deployment", () => {
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

  describe("Token::Minting", () => {
    it("only address with minter role can mint tokens", async () => {
      await catchRevert(dae.mint(user1, 5 * 10 ** DECIMALS, { from: random }));
      await dae.mint(user1, 5 * 10 ** DECIMALS, { from: owner });

      const totalSupply = await dae.totalSupply();
      assert.equal(totalSupply, 42000050000, "incorrect supply");
    });

    it("only existing minter can add a new minter", async () => {
      await catchRevert(dae.addMinter(user2, { from: random }));
      await dae.addMinter(user2, { from: owner });

      const isMinter = await dae.isMinter(user2);
      assert(isMinter);

      await dae.mint(user1, 5 * 10 ** DECIMALS, { from: user2 });
    });

    it("correct transfer event when minting", async () => {
      await dae.mint(user1, 5 * 10 ** DECIMALS, { from: owner });

      const { from, to, value } = await getLastEvent("Transfer");

      assert.equal(from, ZERO_ADDRESS);
      assert.equal(to, user1);
      assert.equal(value, 5 * 10 ** DECIMALS);
    });

    it("cannot mint more than max supply", async () => {
      await catchRevert(
        dae.mint(user1, MAX_SUPPLY * 10 ** DECIMALS, { from: owner })
      );
    });
  });

  describe("Token::Transfer", () => {
    it("cannot transfer a tokens not owned", async () => {
      await catchRevert(dae.transfer(user1, 1, { from: random }));
      await dae.mint(user1, 5 * 10 ** DECIMALS, { from: owner });
      await dae.transfer(user2, 1, { from: user1 });
    });
    it("can delegate DAE transfer", async () => {
      await dae.mint(user1, 5 * 10 ** DECIMALS, { from: owner });
      await dae.approve(user2, 1000, { from: user1 });

      await dae.transferFrom(user1, user3, 1000, { from: user2 });
      const balance = await dae.balanceOf(user3);
      assert.equal(balance, 1000, "incorrect user3 balance");
    });
  });
});
