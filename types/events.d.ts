export type RegisteredEventData = {
  id: string;
  client_id: string;
};

export type SMSEventData = {
  user: string;
  status: string;
  providerOrderId: string;
  code: string;
  message: string;
};
