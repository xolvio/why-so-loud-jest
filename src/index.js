/* eslint-disable no-undef */
let consoleMessages = [];

// get information about the current test
jasmine.getEnv().addReporter({
  specStarted: (result) => {
    jasmine.currentTest = result;
  },
  specDone: (result) => {
    jasmine.currentTest = result;
  },
});

const orig = console;
function squirrelAway(logger, ...args) {
  const trace = new Error().stack.split("\n");
  trace.shift(); // removes Error: stacktrace
  trace.shift(); // removes squirrelAway() call from the "throw" command
  trace.shift(); // removes console logger call in the console override

  consoleMessages.push({
    payload: args,
    stacktrace: trace.join("\n"),
    logger,
  });
}

global.console = {
  ...console,
  // use jest.fn() to silence, comment out to leave as it is
  log: (...args) => squirrelAway(orig.log, ...args),
  error: (...args) => squirrelAway(orig.error, ...args),
  warn: (...args) => squirrelAway(orig.warn, ...args),
  info: (...args) => squirrelAway(orig.info, ...args),
  debug: (...args) => squirrelAway(orig.debug, ...args),
};

global.afterEach(() => {
  // this includes tests that got aborted, ran into errors etc.
  const failed =
    jasmine &&
    jasmine.currentTest &&
    Array.isArray(jasmine.currentTest.failedExpectations)
      ? jasmine.currentTest.failedExpectations.length > 0
      : true;
  if (failed) {
    consoleMessages.forEach((msg) => {
      // eslint-disable-next-line no-param-reassign
      msg.logger.__stacktrace__ = msg.stacktrace;
      msg.logger.call(msg.logger, ...msg.payload);
    });
  }
  consoleMessages = [];
});
