import Modal from "./Modal";
import Button from "./Button";
import "./ConfirmDialog.css";

/**
 * Confirmation dialog built on top of Modal.
 * Used for destructive actions (delete) that need an explicit user confirmation.
 */
function ConfirmDialog({
  title = "Confirmer",
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  loading = false,
  error = null,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <div className="confirm">
        <p className="confirm__message">{message}</p>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Suppression…" : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
