
# Fly-by-Wire Student (web + mobile)


## Development installation
```
git clone https://github.com/wombats-writing-code/fbw-student.git
```

Install required packages in `ios`:
```
cd ios
npm install
```

Install required dependencies in `web`:
```
cd web
npm install
```

The code in `platform-common` has dependencies. These need to be resolved when you are developing for web:
```
cd platform-common
npm link

cd web
npm link ../platform-common
```

## Development

Each platform runs separately in its folder, but symlinks to the `platform-common` folder

### iOS
To develop for iOS:
```
cd ios
npm run dev
```

This will start (concurrently) 2 tasks: the React Native packager, and a background gulp watch task that watches for changes in the platform-common code, and copies over all files to the `ios/node_modules` directory. We need this because watchman doesn't follow sym links properly ([RN issue](https://github.com/facebook/react-native/issues/637)).

### web
To develop for web:
```
cd web
npm start
```

## Testing
Unit tests are kept close to the code, within each discrete module.

`platform-common` are all unit tests, since these are all modular pure functions. To start testing:
```
cd platform-common
npm test
```
This runs the mocha test suite *once*. It globs through every file in the `platform-common` directory and finds ones with name `*.spec.js`.


## Code structure
More soon.


## Issues
Sometimes the packager will have spasms or complain it can't find a module that's obviously there. Just `ctrl-c` out of the process and start again.
