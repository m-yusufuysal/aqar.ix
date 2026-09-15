export type AgenticCallState =
  | 'idle'
  | 'enriching_hierarchical_context'
  | 'initiating_webrtc_stream'
  | 'executing_opening_hook'
  | 'negotiating_exclusive_listing'
  | 'cross_sell_offplan_pivot'
  | 'deal_agreed'
  | 'dispatching_multichannel_notifications';

export interface StatefulContextGraph {
  callId: string;
  leadId: string;
  state: AgenticCallState;
  speculativeRagResults: {
    dldCompsFetched: boolean;
    genieMapSynced: boolean;
    agencyDnaInjected: boolean;
  };
  liveTurnCount: number;
}

export function initializeContextGraph(callId: string, leadId: string): StatefulContextGraph {
  return {
    callId,
    leadId,
    state: 'enriching_hierarchical_context',
    speculativeRagResults: {
      dldCompsFetched: true,
      genieMapSynced: true,
      agencyDnaInjected: true,
    },
    liveTurnCount: 0,
  };
}
