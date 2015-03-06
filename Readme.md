# Sample project to demonstrate the use of [raml2code](https://github.com/gextech/raml2code)

[![Build Status](https://img.shields.io/travis/atomsfat/raml2code-example/master.svg?style=flat)](https://travis-ci.org/atomsfat/raml2code-example)

* This project use raml as contract first, generating JAX-RS Interfaces, Pojo and Retrofit client
* All generated files are put on src/generated

## To test
```bash
git clone https://github.com/atomsfat/raml2code-example.git
cd raml2code-example
npm install
npm -g install gulp
gulp
```
It should generated files in src/generated
P.D Some warning should appear on the console, they are just warnings.