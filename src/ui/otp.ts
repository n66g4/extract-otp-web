import { t } from "../services/i18n";

export enum OtpType {
  HOTP = 1,
  TOTP = 2,
}

export interface OtpTypeInfo {
  key: string;
  description: string;
}

/**
 * Returns descriptive information about the OTP type.
 * Defaults to HOTP for unknown numeric types based on original logic.
 * @param type The numeric OTP type from the migration data.
 * @returns An object with a protocol 'key' and a full 'description'.
 */
export function getOtpTypeInfo(type: number): OtpTypeInfo {
  if (type === OtpType.TOTP) {
    return {
      key: "totp",
      description: t("common.type") + " " + "Time-based (TOTP)", // Keep technical term
    };
  }
  return {
    key: "hotp",
    description: t("common.type") + " " + "Counter-based (HOTP)", // Keep technical term
  };
}
