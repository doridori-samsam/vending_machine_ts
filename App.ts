const world = "Hi";

export function hello(word: string = world): string {
  return `Hello ${world}! `;
}

