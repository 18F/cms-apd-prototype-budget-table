[![CircleCI](https://circleci.com/gh/18F/cms-apd-prototype-budget-table/tree/master.svg?style=svg)](https://circleci.com/gh/18F/cms-apd-prototype-budget-table/tree/master)
[![Code Climate](https://codeclimate.com/github/18F/cms-apd-prototype-budget-table/badges/gpa.svg)](https://codeclimate.com/github/18F/cms-apd-prototype-budget-table)
[![Test Coverage](https://codeclimate.com/github/18F/cms-apd-prototype-budget-table/badges/coverage.svg)](https://codeclimate.com/github/18F/cms-apd-prototype-budget-table)

# CMS APD Project | Prototype | Budget Table

A very simple static React app for building APD budget tables.

## The live things

You can view a [live instance of the prototype](https://mmis-financial-requests.app.cloud.gov/) to poke
around at it.  There are currently two major prototyped areas.

1. Financial request input and review  
  This is the first thing you see, where you'll see a login form.  Entering the username "cms"
  will take you to the financial request review section, and any other username will take you
  to the financial request input section.  (No password is required for either one.)

2. Project search  
  The [project search section](https://mmis-financial-requests.app.cloud.gov/#/search) is not linked from
  the prototype front page right now.  Currently it lets you perform simple searches on dummy data, based
  on project names, states, or invovled vendors.

## Developing

After you clone the repo, you can use [Docker](https://www.docker.com/) to get your local environment
up and running quickly, or you can just install your [Node.js](https://nodejs.org) dependencies directly.

### docker

Just run `docker-compose up`, wait until it's done, and then open http://localhost:8080/

### direct

Run these commands to get going:
```
cd web
npm install
npm start
```

Then open http://localhost:8080/.

## Public domain

This project is in the worldwide [public domain](LICENSE.md).   As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within   the United States, and copyright and related rights in the
> work worldwide are waived through the
> [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).  
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request,
> you are agreeing to comply with this waiver of copyright interest.
