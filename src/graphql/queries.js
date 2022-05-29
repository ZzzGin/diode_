/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDiode = /* GraphQL */ `
  query GetDiode($id: ID!) {
    getDiode(id: $id) {
      id
      state
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listDiodes = /* GraphQL */ `
  query ListDiodes(
    $filter: ModelDiodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDiodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        state
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
