# Random Number Utilities
[Description](#description) |
[Prerequisites](#prerequisites) |
[Usage](#usage) |

## Description
This application uses government-certified, authoritative random number sources (via accessing publicly-available online APIs). Therefore, the results produced are not 'pseudo-random' (as many so-called 'random' / impostor apps in widespread usage suffer from), but rather are guaranteed TRUE random numbers, which can be proven via time-stamp verification code.

The random number data (seed data) is cached to your device upon it's retrieval from the internet, and then is used in the various tools within the app.

## Prerequisites
NodeJS / NPM must be already installed on your machine before running this app.

**NodeJS / NPM Installation**

- Install Node from the [Node.js](https://nodejs.org/en/) website.
- Verify it is installed correctly with the following at your command line:

```shell
$ npm -v
# (should return a version number)
```

## Usage
Follow these steps to build & run the app

1: Clone repo
```shell
$ git clone git@github.com:JoeCostanzo/<repo name here>.git
```

2: Install packages
```shell
$ npm install
```

3: Build & Run
```shell
$ ionic serve
```
