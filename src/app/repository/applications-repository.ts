import { ApplicationStatus } from './types';

export async function createApplication(input: {
  projectId: string;
  applicantId: string;
  message: string;
  proposedBudget: number;
  status: ApplicationStatus;
}) {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(300);
  // Mock: pretend the application was created successfully and return an id
  return { id: `app-${Date.now()}` };
}