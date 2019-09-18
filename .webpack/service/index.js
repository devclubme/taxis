module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("serverless-http");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("graphql-playground-middleware-express");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const https = __webpack_require__(0);

const axios = __webpack_require__(1);

const cheerio = __webpack_require__(5);

const moment = __webpack_require__(2);

const _ = __webpack_require__(3);

module.exports = async (data, context) => {
  console.log(data);
  const serviceUrl = "https://eprijava.tax.gov.me/TaxisPortal/TaxPayerCompanies/Details";
  const url = serviceUrl + '?PIB=' + data.companyId;
  var company;
  const headers = {
    'Accept': '*/*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
  }; // IMPORTANT
  // https://github.com/nodejs/node/issues/9845
  // https://github.com/axios/axios/issues/1304

  const agent = new https.Agent({
    ciphers: 'DES-CBC3-SHA'
  });
  await axios.get(url, {
    headers: headers,
    httpsAgent: agent
  }).then(response => {
    //handle success
    const html = response.data;
    const $ = cheerio.load(html);
    company = {
      // row 0
      companyId: $("tbody > tr").eq(0).find('.display').text(),
      companyName: $("tbody > tr").eq(1).find('.display').text(),
      companyAddress: $("tbody > tr").eq(2).find('.display').text(),
      businessSectorCode: $("tbody > tr").eq(3).find('.display').text().split(" - ")[0].trim(),
      businessSectorName: $("tbody > tr").eq(3).find('.display').text().split(" - ")[1].trim(),
      taxArea: $("tbody > tr").eq(5).find('.display').text(),
      companyRegistrationDate: $("tbody > tr").eq(6).find('.display').text(),
      companyRegistrationId: $("tbody > tr").eq(7).find('.display').text(),
      companyRegistrationInstitution: $("tbody > tr").eq(8).find('.display').text(),
      companyRegisteredForVat: $("tbody > tr").eq(10).find('.display').text(),
      companyVatRegistrationDate: $("tbody > tr").eq(11).find('.display').text(),
      companyVatRegistrationId: $("tbody > tr").eq(12).find('.display').text()
    };
  }).catch(response => {
    //handle error
    console.log("ERROR");
    console.log(response);
  });
  return company;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const https = __webpack_require__(0);

const axios = __webpack_require__(1);

const moment = __webpack_require__(2);

const _ = __webpack_require__(3);

module.exports = async (data, context) => {
  const serviceUrl = "https://eprijava.tax.gov.me/TaxisPortal/FinancialStatement/TaxPayerStatementsList";
  const url = serviceUrl + '?PIB=' + data.companyId;
  var statements;

  const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

  const headers = {
    'Accept': '*/*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
  };
  const requestBody = {
    take: 100,
    skip: 0,
    page: 1,
    pageSize: 100
  }; // IMPORTANT
  // https://github.com/nodejs/node/issues/9845
  // https://github.com/axios/axios/issues/1304

  const agent = new https.Agent({
    ciphers: 'DES-CBC3-SHA'
  });
  await axios.post(url, formUrlEncoded(requestBody), {
    headers: headers,
    httpsAgent: agent
  }).then(response => {
    //handle success
    statements = response.data.data.map(function (el) {
      return {
        year: el.Year,
        statementId: el.FinStatementNumber
      };
    });
  }).catch(response => {
    //handle error
    console.log("ERROR");
    console.log(response);
  });
  return statements;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const https = __webpack_require__(0);

const axios = __webpack_require__(1);

const cheerio = __webpack_require__(5);

const moment = __webpack_require__(2);

const _ = __webpack_require__(3);

module.exports = async (data, context) => {
  const serviceUrl = "https://eprijava.tax.gov.me/TaxisPortal/FinancialStatement/Details";
  const url = serviceUrl + '?rbr=' + data.statementId;
  var statement;
  const headers = {
    'Accept': '*/*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
  }; // IMPORTANT
  // https://github.com/nodejs/node/issues/9845
  // https://github.com/axios/axios/issues/1304

  const agent = new https.Agent({
    ciphers: 'DES-CBC3-SHA'
  });
  await axios.get(url, {
    headers: headers,
    httpsAgent: agent
  }).then(response => {
    //handle success
    const html = response.data;
    const $ = cheerio.load(html);
    statement = {
      // row 0
      statementYear: $(".FinStateTable tr").eq(0).find('td').eq(0).find('span').text(),
      statementFromDate: $(".FinStateTable tr").eq(0).find('td').eq(1).find('span').text(),
      statementToDate: $(".FinStateTable tr").eq(0).find('td').eq(2).find('span').text(),
      statementId: $(".FinStateTable tr").eq(0).find('td').eq(3).contents().last().text().trim(),
      // row 1
      companyName: $(".FinStateTable tr").eq(1).find($('.display')).text(),
      // row 2
      companyLocation: $(".FinStateTable tr").eq(2).find($('.display')).text(),
      // row 4
      businessSectorCode: $(".FinStateTable tr").eq(4).find('td').eq(0).find('span').text(),
      companyId: $(".FinStateTable tr").eq(4).find('td').eq(1).find('span').text(),
      changeType: $(".FinStateTable tr").eq(4).find('td').eq(2).find('strong').text(),
      consolidatedStatement: $(".FinStateTable tr").eq(4).find('td').eq(3).find('span').text().trim(),
      // row 5
      statementAuthorName: $(".FinStateTable tr").eq(5).find('td').eq(0).find('span').text(),
      statementAuthorUnid: $(".FinStateTable tr").eq(5).find('td').eq(1).contents().last().text().trim(),
      statementAuthorEmail: $(".FinStateTable tr").eq(5).find('td').eq(2).contents().last().text().trim(),
      // row 6
      companyOfficialFirstName: $(".FinStateTable tr").eq(6).find('td').eq(0).find('span').text(),
      companyOfficialLastName: $(".FinStateTable tr").eq(6).find('td').eq(1).find('span').text(),
      companyOfficialUnid: $(".FinStateTable tr").eq(6).find('td').eq(2).contents().last().text().trim(),
      // row 7
      statementCashFlowMethod: $(".FinStateTable tr").eq(7).find('td').eq(0).find('strong').text(),
      statementDate: $(".FinStateTable tr").eq(7).find('td').eq(1).find('span').text()
    };
    const balanceSheet = $("#TBilansStanja > tbody > tr").map(function (i, el) {
      const key = $(el).find('td').eq(2).text();

      if (key !== "") {
        return {
          key: key,
          value: $(el).find('td').eq(4).text()
        };
      }

      return null;
    }).get();
    const balanceSuccessSheet = $("#TBilansUspjeha > tbody > tr").map(function (i, el) {
      const key = $(el).find('td').eq(2).text();

      if (key !== "") {
        return {
          ordinal_number: key,
          description: $(el).find('td').eq(1).text(),
          current_year: $(el).find('td').eq(4).text(),
          last_year: $(el).find('td').eq(5).text()
        };
      }

      return null;
    }).get();
    const balanceCashFlowSheet = $("#TIskazOTokovimaGotovine > tbody > tr").map(function (i, el) {
      const key = $(el).find('td').eq(1).text();

      if (key !== "") {
        return {
          key: key,
          value: $(el).find('td').eq(2).text()
        };
      }

      return null;
    }).get();
    const balanceStatsSheet = {};
    $("#TStatistickiAneks > tbody > tr").each(function (i, el) {
      const key = $(el).find('td').eq(2).text();

      if (key !== "") {
        balanceStatsSheet["field" + key] = $(el).find('td').eq(4).text();
      }
    });
    statement['balanceSheet'] = balanceSheet;
    statement['balanceSuccessSheet'] = balanceSuccessSheet;
    statement['balanceCashFlowSheet'] = balanceCashFlowSheet;
    statement['balanceStatsSheet'] = balanceStatsSheet;
  }).catch(response => {
    //handle error
    console.log("ERROR");
    console.log(response);
  });
  return statement;
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _resolvers_crps_company_mock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _resolvers_crps_company_mock__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_resolvers_crps_company_mock__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _resolvers_taxis_company__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _resolvers_taxis_company__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_resolvers_taxis_company__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _resolvers_taxis_statements__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _resolvers_taxis_statements__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_resolvers_taxis_statements__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _resolvers_taxis_statement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _resolvers_taxis_statement__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_resolvers_taxis_statement__WEBPACK_IMPORTED_MODULE_7__);
// index.js








const typeDefs = apollo_server_express__WEBPACK_IMPORTED_MODULE_3__["gql"]`
  type Query {
    taxis: Taxis
  }

  "Poreska uprava"
  type Taxis {
    institution: String,
    version: String,
    company(companyId: String!): TaxisCompany
  }

  type TaxisCompany {
    companyId: String,
    companyName: String,
    companyAddress: String,
    businessSectorCode: String,
    businessSectorName: String,
    taxArea: String,
    companyRegistrationDate: String,
    companyRegistrationId: String,
    companyRegistrationInstitution: String,
    companyRegisteredForVat: String,
    companyVatRegistrationDate: String,
    companyVatRegistrationId: String,
    financialStatements: [FinancialStatement]
  }

  type FinancialStatement {
    year: String,
    statementId: String,
    balance: BalanceSuccessSheet
    }

   type BalanceSuccessSheet {
      income: String,
      expense: String
    }
  `;
const resolvers = {
  Query: {
    taxis: () => {
      return {
        institution: "Poreska Uprava",
        version: "1"
      };
    }
  },
  Taxis: {
    company: (_, {
      companyId
    }, __) => {
      return _resolvers_taxis_company__WEBPACK_IMPORTED_MODULE_5___default()({
        companyId
      });
    }
  },
  TaxisCompany: {
    financialStatements: (company, _, __) => {
      return _resolvers_taxis_statements__WEBPACK_IMPORTED_MODULE_6___default()({
        companyId: company.companyId
      });
    }
  },
  FinancialStatement: {
    balance: (statement, _, __) => {
      return _resolvers_taxis_statement__WEBPACK_IMPORTED_MODULE_7___default()({
        statementId: statement.statementId
      });
    }
  },
  BalanceSuccessSheet: {
    income: (statementDetails, _, __) => {
      console.log("Statement details upcoming!");
      console.log(statementDetails);
      return statementDetails.balanceSuccessSheet.find(({
        ordinal_number
      }) => ordinal_number === '201').current_year;
    },
    expense: (statementDetails, _, __) => {
      return statementDetails.balanceSuccessSheet.find(({
        ordinal_number
      }) => ordinal_number === '207').current_year;
    }
  }
};
const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_3__["ApolloServer"]({
  typeDefs,
  resolvers,
  path: '/graphql'
});
server.applyMiddleware({
  app
});
app.get('/playground', graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_2___default()({
  endpoint: '/dev/graphql'
}));
const handler = serverless_http__WEBPACK_IMPORTED_MODULE_1___default()(app);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = async (data, context) => {
  return {
    "companyId": "02655284",
    "companyRegistrationId": "50368574",
    "companyRegistrationChangeId": "26",
    "companyName": "DRUŠTVO ZA TELEKOMUNIKACIJE \"MTEL\"DOO PODGORICA",
    "companyShortName": "MTEL",
    "companyType": "DRUŠTVO SA OGRANIČENOM ODGOVORNOŠĆU",
    "businessSectorCode": "6120",
    "businessSectorName": "Bežične telekomunikacije",
    "companyHeadquartersAddressStreet": "ULICA KRALJA NIKOLE 27A",
    "companyHeadquartersAddressCity": "PODGORICA",
    "companyPostDeliveryAddressStreet": "ULICA KRALJA NIKOLE 27A",
    "companyPostDeliveryAddressCity": "PODGORICA",
    "companyTotalCapital": "62472440",
    "companyRegistrationDate": "04.04.2007",
    "companyRegistrationChangeDate": "18.07.2018",
    "companyStatus": "Registrovan",
    "companyOfficials": [{
      "firstName": "MARKO",
      "lastName": "LOPIČIĆ",
      "responsibility": "KOLEKTIVNO",
      "equity": "",
      "roles": [{
        "description": "Član Odbora direktora",
        "key": "board-member"
      }]
    }, {
      "firstName": "JANA",
      "lastName": "LJUBIČIĆ",
      "responsibility": "KOLEKTIVNO",
      "equity": "",
      "roles": [{
        "description": "Član Odbora direktora",
        "key": "board-member"
      }]
    }, {
      "firstName": "ŽIKA",
      "lastName": "GOJKOVIĆ",
      "responsibility": "KOLEKTIVNO",
      "equity": "",
      "roles": [{
        "description": "Član Odbora direktora",
        "key": "board-member"
      }]
    }, {
      "firstName": "ALEKSANDAR",
      "lastName": "RADOVANOVIĆ",
      "responsibility": "KOLEKTIVNO",
      "equity": "",
      "roles": [{
        "description": "Član Odbora direktora",
        "key": "board-member"
      }]
    }, {
      "firstName": "MILENKO",
      "lastName": "DŽELETOVIĆ",
      "responsibility": "KOLEKTIVNO",
      "equity": "",
      "roles": [{
        "description": "Član Odbora direktora",
        "key": "board-member"
      }, {
        "description": "Predsjednik Odbora direktora",
        "key": "board-president"
      }]
    }, {
      "firstName": "VLADIMIR",
      "lastName": "LUČIĆ",
      "responsibility": "POJEDINAČNO",
      "equity": "",
      "roles": [{
        "description": "Izvršni direktor  ",
        "key": "ceo"
      }]
    }, {
      "firstName": "PREDUZEĆE ZA TELEKOMUNIKACIJE \"TELEKOM SRBIJA\"A.D.BEOGRAD SRBIJA",
      "lastName": "",
      "responsibility": "",
      "equity": "51",
      "roles": [{
        "description": "Osnivač",
        "key": "founder"
      }]
    }, {
      "firstName": "TELEKOMUNIKACIJE REPUBLIKE SRPSKE AKCIONARSKO DRUŠTVO ",
      "lastName": "",
      "responsibility": "",
      "equity": "49",
      "roles": [{
        "description": "Osnivač",
        "key": "founder"
      }]
    }]
  };
};

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map