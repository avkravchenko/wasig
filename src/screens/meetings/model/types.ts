export const MEETING_REQUEST_ROUTE = "meeting-request" as const;

export type MeetingRequestRouteParams = {
  [MEETING_REQUEST_ROUTE]: {
    requestId: string;
  };
};
