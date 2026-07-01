export type AuditAction =
  | "course.created"
  | "course.updated"
  | "course.read"
  | "course.listed";

export interface AuditEvent {
  id: string;
  action: AuditAction;
  actor?: string;
  resource_type: "Course";
  resource_id?: string;
  occurred_at: string;
  metadata?: Record<string, unknown>;
}

export interface AuditSink {
  emit(event: Omit<AuditEvent, "id" | "occurred_at">): Promise<void>;
}

export class ConsoleAuditSink implements AuditSink {
  async emit(event: Omit<AuditEvent, "id" | "occurred_at">): Promise<void> {
    const auditEvent: AuditEvent = {
      id: crypto.randomUUID(),
      occurred_at: new Date().toISOString(),
      ...event
    };

    console.log(JSON.stringify({ type: "audit", event: auditEvent }));
  }
}

export class NoopAuditSink implements AuditSink {
  async emit(): Promise<void> {
    return;
  }
}
