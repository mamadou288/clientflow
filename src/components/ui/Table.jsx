import EmptyState from "./EmptyState";
import "./Table.css";

/**
 * Generic, reusable data table.
 *
 * columns: [{ key, header, render?, width? }]
 *   - render(row) lets a column format its cell (e.g. currency, badge).
 * data: array of rows (each must have a unique `id`).
 * onRowClick: optional, makes rows clickable.
 */
function Table({ columns, data, onRowClick, emptyMessage = "Aucun résultat." }) {
  if (!data || data.length === 0) {
    return (
      <div className="table__empty">
        <EmptyState message={emptyMessage} />
      </div>
    );
  }

  return (
    <div className="table__wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? "table__row--clickable" : undefined}
            >
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
