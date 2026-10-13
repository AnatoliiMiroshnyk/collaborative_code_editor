export interface User {
  clientId: number;
  name: string;
  color: string;
  cursor?: { line: number; column: number };
}

export type Language = 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json';
