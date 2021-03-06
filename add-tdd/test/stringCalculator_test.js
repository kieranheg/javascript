"use strict";

const expect = require('chai').expect;
const add = require('../stringCalculator').add;

describe("String Calculator tests", () => {
  describe("Add", () => {

    it('an empty string param will return 0', () => {
      expect(add("")).to.equal(0);
    })

    it('a single string param of zero will return that as a number', () => {
      expect(add("0")).to.equal(0);
    })
    
    it('a single string param will return that as a number', () => {
      expect(add("5")).to.equal(5);
    })

    it('a string param with 2 numbers will return their sum as a number', () => {
      expect(add("5,3")).to.equal(8);
    })

    it('a string param with 2 numbers, including zero, will return their sum as a number', () => {
      expect(add("5,0")).to.equal(5);
    })

    it('a string param with 2 numbers, including zero, will return their sum as a number', () => {
      expect(add("0,11")).to.equal(11);
    })

    it('a string param with n numbers will return their sum as a number', () => {
      expect(add("0,11,5,7,0,3")).to.equal(26);
    })

    it('a string param with a new line between n numbers will return their sum as a number', () => {
      expect(add("0\n11,5,7,0,3")).to.equal(26);
    })

    it('a string param with new lines b1etween n numbers will return their sum as a number', () => {
      expect(add("0\n11,5,7\n0,3")).to.equal(26);
    })

    it('a string param with a specified delimiter, a new line between n numbers will return their sum as a number', () => {
      expect(add("//;\n0\n11;5;7;0;3")).to.equal(26);
    })

  })
})
