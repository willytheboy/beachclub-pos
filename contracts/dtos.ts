export interface TicketDTO {
  id: string;
  skuId: string;
  price: number;
  vatIncluded: boolean;
  clientId?: string;
}

export interface VoucherRedeemDTO {
  code: string;
  clientId?: string;
}

export interface PettyCashPayoutDTO {
  amount: number;
  reason: string;
  approvedBy: string;
}

export interface WhatsAppSendDTO {
  to: string;
  templateId: string;
  variables: Record<string, string>;
  attachmentUrl?: string;
}

export interface EndOfDayCloseDTO {
  shiftId: string;
  countedCash: number;
}
