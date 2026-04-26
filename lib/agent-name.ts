import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

export function generateAgentName(): string {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    style: 'capital',
    separator: ' ',
  });
}
