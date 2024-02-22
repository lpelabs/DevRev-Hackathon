import ticket_creator from './functions/ticket_creator';
import snapin_intro from './functions/snapin_intro'

export const functionFactory = {
  // Add your functions here
  ticket_creator,
  snapin_intro
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;