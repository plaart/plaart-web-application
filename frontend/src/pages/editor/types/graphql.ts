// Re-export all types from editor.ts for GraphQL compatibility
export * from './editor';

// Additional GraphQL-specific types if needed
export interface GraphQLError {
  message: string;
  locations?: any[];
  path?: any[];
  extensions?: any;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}
