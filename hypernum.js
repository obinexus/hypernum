// hypernum.js
module.exports = {
    precision: 10,
    roundingMode: 'HALF_EVEN',
    checkOverflow: true,
    maxSteps: 2000,
    debug: process.env.NODE_ENV === 'development'
  };