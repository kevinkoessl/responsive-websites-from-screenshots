# Random Data Generation

## Project setup
### Prerequisites

- npm

### Install dependencies
```
npm install
npm install -g serve
```

### Generate Random Training Data
```
mkdir datasets
npm run build
serve -s dist

In Another Terminal:
node site-scraper.js
```
The number of samples can be configured within *site-scraper.js*. Because one out of seven samples will be selected as evaluation sample, the number of samples shall be divisible by seven.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
