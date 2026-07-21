/**
 * Deal pipeline stages — single source of truth.
 * `color` references a design token so badges/columns stay consistent.
 */
export const DEAL_STAGES = [
  { value: "lead", label: "Lead", color: "var(--color-lead)" },
  { value: "qualified", label: "Qualified", color: "var(--color-qualified)" },
  { value: "proposal", label: "Proposal", color: "var(--color-proposal)" },
  { value: "won", label: "Won", color: "var(--color-won)" },
  { value: "lost", label: "Lost", color: "var(--color-lost)" },
];

export const DEAL_STAGE_VALUES = DEAL_STAGES.map((stage) => stage.value);

export function getStage(value) {
  return DEAL_STAGES.find((stage) => stage.value === value) ?? null;
}
