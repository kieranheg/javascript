const mocha = require('mocha')
const describe = mocha.describe
const expect = require('chai').expect;
const idHelper = require('../../helpers/idHelper');

const sampleUserList = [
  {
    name: 'Bob',
    email: 'bob@allstae.com',
    office: [
      {
        id: 'bob123',
        address: '123 acacia avenue',
        status: 'ACT'
      },
      {
        id: 'bob123',
        address: '999 northbrook',
        status: 'TRM'
      }
    ]
  },
  {
    name: 'Mary',
    email: 'mary@allstae.com',
    office: [
      {
        id: 'Mary123',
        address: '123 acacia avenue',
        status: 'ACT'
      },
      {
        id: 'Mary999',
        address: '999 northbrook',
        status: 'TRM'
      }
    ]
  }
]; // master sample list

const jonSingleIdSingleLocn =  {
  name: 'Jon',
  email: 'jon@allstae.com',
  office: [
    {
      id: 'jon345',
      address: '123 acacia avenue',
      status: 'ACT'
    }
  ]
};
const bobSingleIdMultiLocn =  {
  name: 'Bob',
  email: 'bob@allstae.com',
  office: [
    {
      id: 'bob123',
      address: '123 acacia avenue',
      status: 'ACT'
    },
    {
      id: 'bob123',
      address: '999 northbrook',
      status: 'ACT'
    }
  ]
};
const jimSingleIdMultiLocnMultiStatus =  {
  name: 'Jim',
  email: 'jim@allstae.com',
  office: [
    {
      id: 'jim123',
      address: '123 acacia avenue',
      status: 'ACT'
    },
    {
      id: 'jim123',
      address: '999 northbrook',
      status: 'TRM'
    }
  ]
};
const jacSingleIdMultiLocnMultiStatus =  {
  name: 'Jac',
  email: 'jac@allstae.com',
  office: [
    {
      id: 'jac123',
      address: '123 acacia avenue',
      status: 'TRM'
    },
    {
      id: 'jac123',
      address: '999 northbrook',
      status: 'ACT'
    }
  ]
};
const maryMultiIdMultiLocn =  {
  name: 'Mary',
  email: 'mary@allstae.com',
  office: [
    {
      id: 'Mary123',
      address: '123 acacia avenue',
      status: 'ACT'
    },
    {
      id: 'Mary999',
      address: '999 northbrook',
      status: 'ACT'
    }
  ]
};

describe('Map Reduce Filter Demo', function () {
  describe('Process mapped user data', function () {
    it('should handle an empty user list without error', function (done) {
      expect(idHelper.hasMultiIds([])).to.be.false;
      expect(idHelper.hasMultiIds([{}])).to.be.false;
      expect(idHelper.hasMultiIds([{},{}])).to.be.false;
      done();
    });
    it('should handle a single user single office list without error', function (done) {
      let userList = [].push(jonSingleIdSingleLocn);

      expect(idHelper.hasMultiIds([])).to.be.false;
      expect(idHelper.hasMultiIds([{}])).to.be.false;
      expect(idHelper.hasMultiIds([{},{}])).to.be.false;
      done();
    });
  });
});
