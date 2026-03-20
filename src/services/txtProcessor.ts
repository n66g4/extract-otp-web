// src/services/txtProcessor.ts
import { MigrationOtpParameter } from '../types';
import { parseFlexibleInput } from './otpUrlParser';

export async function processText(
  fileContent: string
): Promise<MigrationOtpParameter[]> {
  const lines = fileContent.trim().split(/\r?\n/);
  const allOtpParams: MigrationOtpParameter[] = [];
  const errors: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    try {
      const params = await parseFlexibleInput(trimmedLine);
      allOtpParams.push(...params);
    } catch (error: any) {
      errors.push(`Line ${i + 1}: ${error.message || 'Invalid format'}`);
    }
  }

  if (allOtpParams.length === 0 && errors.length > 0) {
    throw new Error(`Failed to parse any valid OTPs from text.\n${errors[0]}`);
  }

  return allOtpParams;
}
