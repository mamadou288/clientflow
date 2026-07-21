import { useMemo } from "react";
import { DEAL_STAGES } from "../../data/dealStages";
import { formatCurrency } from "../../utils/format";
import "./PipelineBoard.css";

/**
 * Kanban-style pipeline: one column per deal stage.
 * Each column shows the count and the total amount of its deals.
 *
 * deals: array of deals
 * companyName: Map<companyId, name> to label each card
 */
function PipelineBoard({ deals, companyName }) {
  const dealsByStage = useMemo(() => {
    const groups = Object.fromEntries(DEAL_STAGES.map((s) => [s.value, []]));
    deals.forEach((deal) => {
      if (groups[deal.stage]) groups[deal.stage].push(deal);
    });
    return groups;
  }, [deals]);

  return (
    <div className="pipeline">
      {DEAL_STAGES.map((stage) => {
        const stageDeals = dealsByStage[stage.value];
        const total = stageDeals.reduce((sum, d) => sum + d.amount, 0);

        return (
          <div className="pipeline__column" key={stage.value}>
            <header className="pipeline__column-header">
              <span className="pipeline__stage">
                <span
                  className="pipeline__dot"
                  style={{ backgroundColor: stage.color }}
                />
                {stage.label}
                <span className="pipeline__count">{stageDeals.length}</span>
              </span>
              <span className="pipeline__total">{formatCurrency(total)}</span>
            </header>

            <div className="pipeline__cards">
              {stageDeals.length === 0 ? (
                <p className="pipeline__empty">—</p>
              ) : (
                stageDeals.map((deal) => (
                  <article
                    className="pipeline__card"
                    key={deal.id}
                    style={{ borderTopColor: stage.color }}
                  >
                    <p className="pipeline__card-title">{deal.title}</p>
                    <p className="pipeline__card-company">
                      {companyName.get(deal.companyId) ?? "—"}
                    </p>
                    <p className="pipeline__card-amount">
                      {formatCurrency(deal.amount)}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PipelineBoard;
