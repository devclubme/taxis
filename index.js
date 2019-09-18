// index.js
import express from 'express';
import serverless from 'serverless-http';
import playground from 'graphql-playground-middleware-express';
import { ApolloServer, gql } from 'apollo-server-express';

import getCrpsCompany from './resolvers/crps/company_mock';
import getTaxisCompany from './resolvers/taxis/company';
import getTaxisCompanyStatements from './resolvers/taxis/statements';
import getTaxisCompanyStatement from './resolvers/taxis/statement';

const typeDefs = gql`
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
      }
    }
  },

  Taxis: {
    company: (_, { companyId }, __) => {
      return getTaxisCompany({ companyId });
    }
  },

  TaxisCompany: {
    financialStatements: (company, _, __) => {
      return getTaxisCompanyStatements({ companyId: company.companyId });
    }
  },

  FinancialStatement: {
    balance: (statement, _, __) => {
      return getTaxisCompanyStatement({ statementId: statement.statementId });
    }
  },

  BalanceSuccessSheet: {
    income: (statementDetails, _, __) => {
      console.log("Statement details upcoming!")
      console.log(statementDetails)
      return statementDetails.balanceSuccessSheet.find(({ ordinal_number }) => ordinal_number === '201').current_year;
    },
    expense: (statementDetails, _, __) => {
      return statementDetails.balanceSuccessSheet.find(({ ordinal_number }) => ordinal_number === '207').current_year;
    }
  }
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers, path: '/graphql' });

server.applyMiddleware({ app });

app.get('/playground', playground({ endpoint: '/dev/graphql' }));

const handler = serverless(app);

export { handler };
