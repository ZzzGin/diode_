/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDiode = /* GraphQL */ `
  mutation CreateDiode(
    $input: CreateDiodeInput!
    $condition: ModelDiodeConditionInput
  ) {
    createDiode(input: $input, condition: $condition) {
      id
      state
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateDiode = /* GraphQL */ `
  mutation UpdateDiode(
    $input: UpdateDiodeInput!
    $condition: ModelDiodeConditionInput
  ) {
    updateDiode(input: $input, condition: $condition) {
      id
      state
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteDiode = /* GraphQL */ `
  mutation DeleteDiode(
    $input: DeleteDiodeInput!
    $condition: ModelDiodeConditionInput
  ) {
    deleteDiode(input: $input, condition: $condition) {
      id
      state
      owner
      createdAt
      updatedAt
    }
  }
`;
