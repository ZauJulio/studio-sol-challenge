import gql from 'graphql-tag';

export const VerifySchema = gql`
  input Rule {
    "The rule to check"
    rule: String
    "The value to check against"
    value: Int
  }

  type VerifyResult {
    "password is valid"
    verify: Boolean
    "password breaks the rules"
    noMatch: [String]
  }

  "The root query object"
  type Query {
    verify(
      "The password to verify"
      password: String
      "The rules for checking the password"
      rules: [Rule]
    ): VerifyResult
  }
`;
