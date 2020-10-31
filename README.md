# Why-So-Loud-Jest

## Why

Jest by default prints all console.log (warnings, errors, etc) messages to the console. That's great - it helps you understand what's going on in your code when tests run.

The problem starts when your repository grows. You get a mixture of hundreds of logs without being able to connect them to specific tests.

You might be able to use the logs, but there is as big of a chance that they will confuse you (you will think you found a log related to the test you are interested in, but it might from a different one).

You could just turn all the noise, to at least have a nice output. (especially on CI, no one wants to scroll through tens of pages of Jenkins beautiful UI ;-) )

But that way if something fails, you lose an important debugging tool. Maybe the test does not fail locally, and the logs would make it trivial to understand what happened? But now you have to disable all but the failing test, re-enable logs... nigthmare!

With this tiny plugin you will be able to see ONLY RELEVANT console messages. That means - if all your tests pass, you have a beautiful jest tests report. If something fails - you see logs only for the test that failed!

## How

Install this package:

yarn add why-so-loud-jest -D

Add it to your jest.config, with the verbose option 
*we are setting verbose becuase while do do we want the logs not to be there in general,
nonetheless when they are needed we want a nice, verbose report with a stack trace. 
If you decide to do this you should probably follow the next step as well.*

`setupFilesAfterEnv: ['why-so-loud-jest'],

verbose: true`

Enjoy much quieter jest!


## Fix for wrong console messages stack traces

The downside of doing so will be that jest will show wrong stack-traces for the messages. Sad! :-(

If that starts bugging you, there is an option. 

Now run `npx why-so-loud-jest` at the root of your package. 
That will create patches for jest that will fix the problem. Follow the instruction displayed by the tool or here:

Please add postinstall script to your package.json:
```
"scripts": {
  "postinstall": "patch-package"
}
```
install it:

```
npm i patch-package
```

if you use yarn:
```
yarn add patch-package postinstall-postinstall
```
(check https://www.npmjs.com/package/patch-package documentation)

run it once manually:

```
npx patch-package
```

## Credit

The code was inspired by the https://stackoverflow.com/questions/58936650/javascript-jest-how-to-show-logs-from-test-case-only-when-test-fails thread, in particular @casualcoder and @Finesse 
