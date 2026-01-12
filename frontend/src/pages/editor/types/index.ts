// Re-export all types from editor.ts and graphql.ts
export * from './editor';
export * from './graphql';

// Additional utility types
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
