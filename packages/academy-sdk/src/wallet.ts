import type { Did } from "./did.js";

export type WalletDeliveryMode = "download" | "wallet-link" | "oid4vci" | "didcomm" | "api";
export type WalletDeliveryStatus = "pending" | "delivered" | "accepted" | "failed" | "revoked";

export interface WalletLink {
  walletId: string;
  holderDid: Did | string;
  provider?: string;
  label?: string;
  createdAt: string;
  status: "active" | "disabled";
}

export interface WalletDeliveryRequest {
  credentialId: string;
  holderDid: Did | string;
  walletId?: string;
  mode: WalletDeliveryMode;
  callbackUrl?: string;
}

export interface WalletDeliveryResult {
  credentialId: string;
  walletId?: string;
  mode: WalletDeliveryMode;
  status: WalletDeliveryStatus;
  deliveryUrl?: string;
  expiresAt?: string;
  error?: string;
}

export interface WalletProvider {
  link(holderDid: Did | string): Promise<WalletLink>;
  deliver(request: WalletDeliveryRequest): Promise<WalletDeliveryResult>;
}
