import gql from 'graphql-tag';

export const VerifySchema = gql`
  input Rule {
    rule: String
    value: Int
  }

  type VerifyResult {
    verify: Boolean
    noMatch: [String]
  }

  type Query {
    hello: String
    verify(password: String, rules: [Rule]): VerifyResult
  }
`;
