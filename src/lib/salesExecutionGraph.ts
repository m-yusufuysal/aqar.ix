export type SalesGraphNodeId =
  | 'NODE_INTENT_CLASSIFY'
  | 'NODE_ACCUSATION_AUDIT'
  | 'NODE_SECONDARY_LISTING_ANCHOR'
  | 'NODE_OFFPLAN_CROSS_SELL_PIVOT'
  | 'NODE_TOOL_DISPATCH'
  | 'NODE_POST_CALL_AUTOMATION';

export interface SalesGraphState {
  currentNodeId: SalesGraphNodeId;
  leadId: string;
  agreedOutcome?: 'listing_agreed' | 'eoi_booked' | 'meeting_booked' | 'whatsapp_pdf_sent';
  dialogueTurnCount: number;
  extractedEntity: {
    targetPriceAED?: number;
    preferredProject?: string;
    meetingTime?: string;
  };
}

export class LangGraphSalesExecutionMachine {
  private state: SalesGraphState;

  constructor(leadId: string) {
    this.state = {
      currentNodeId: 'NODE_INTENT_CLASSIFY',
      leadId,
      dialogueTurnCount: 0,
      extractedEntity: {},
    };
  }

  public transitionToNode(nextNodeId: SalesGraphNodeId, entityUpdate?: Partial<SalesGraphState['extractedEntity']>) {
    console.log(`[LANGGRAPH SALES DAG TRANSITION]: ${this.state.currentNodeId} -> ${nextNodeId}`);
    this.state.currentNodeId = nextNodeId;
    this.state.dialogueTurnCount += 1;
    if (entityUpdate) {
      this.state.extractedEntity = { ...this.state.extractedEntity, ...entityUpdate };
    }
    return this.state;
  }

  public getPromptForNode(prospectName: string, area: string): string {
    switch (this.state.currentNodeId) {
      case 'NODE_ACCUSATION_AUDIT':
        return `[NODE: ACCUSATION AUDIT] Disarm ${prospectName} immediately: "Look ${prospectName}, I know you get 10 broker calls a day asking for listings... But I am calling with 2 verified cash buyers in ${area}."`;
      case 'NODE_SECONDARY_LISTING_ANCHOR':
        return `[NODE: LISTING ANCHOR] Pitch 30-day exclusive representation. Guarantee net price or zero fee.`;
      case 'NODE_OFFPLAN_CROSS_SELL_PIVOT':
        return `[NODE: OFF-PLAN PIVOT] ${prospectName} hesitates or wants rental yield. Pivot to Emaar/Sobha pre-launch 80/20 payment plan with 38% capital growth.`;
      case 'NODE_TOOL_DISPATCH':
        return `[NODE: TOOL DISPATCH] Trigger agree_to_listing, reserve_eoi_token, or send_whatsapp_comps_brochure immediately.`;
      default:
        return `[NODE: INTENT CLASSIFY] Qualify ${prospectName}'s timeline and current holding goals.`;
    }
  }

  public getCurrentState() {
    return this.state;
  }
}
