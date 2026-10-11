import React from "react";

const styles = `
.document-list {
  width: 100%;
  padding: 24px;
  color: #17263d;
  background: #ffffff;
  border: 1px solid #e2e7ee;
  border-radius: 8px;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
}

.document-list *,
.document-list *::before,
.document-list *::after {
  box-sizing: border-box;
}

.document-list__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.document-list__eyebrow {
  margin: 0 0 8px;
  color: #526b8b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.document-list__title {
  margin: 0;
  color: #142640;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 26px;
  font-weight: 500;
}

.document-list__description {
  margin: 8px 0 0;
  color: #637083;
  font-size: 13px;
  line-height: 1.7;
}

.document-list__count {
  flex-shrink: 0;
  padding: 8px 11px;
  color: #365b86;
  background: #f0f5fb;
  border: 1px solid #dce7f4;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.document-list__table-wrap {
  width: 100%;
  overflow-x: auto;
}

.document-list__table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.document-list__table th {
  padding: 13px 12px;
  color: #6b7788;
  background: #f8fafc;
  border-bottom: 1px solid #e1e7ee;
  font-size: 11px;
  text-transform: uppercase;
  white-space: nowrap;
}

.document-list__table td {
  padding: 15px 12px;
  border-bottom: 1px solid #e9edf2;
  font-size: 13px;
  vertical-align: middle;
}

.document-list__file {
  display: flex;
  min-width: 190px;
  align-items: center;
  gap: 12px;
}

.document-list__file-icon {
  display: grid;
  width: 42px;
  height: 44px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  color: #365b86;
  background: #eff4fa;
}

.document-list__file-icon--pdf {
  color: #98403c;
  background: #fbefed;
}

.document-list__file-icon--txt {
  color: #365b86;
  background: #eff4fa;
}

.document-list__file-icon--doc {
  color: #23527c;
  background: #eef3f9;
}

.document-list__file-info {
  display: grid;
  min-width: 0;
  gap: 5px;
}

.document-list__file-name {
  overflow-wrap: anywhere;
  color: #26384f;
  font-size: 13px;
  font-weight: 600;
}

.document-list__file-date,
.document-list__size {
  color: #788496;
  font-size: 11px;
}

.document-list__status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 9px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.document-list__status-dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

.document-list__status--ready {
  color: #28704e;
  background: #edf7f0;
}

.document-list__status--processing {
  color: #355f91;
  background: #eef4fb;
}

.document-list__status--review {
  color: #946514;
  background: #fff7e8;
}

.document-list__status--failed {
  color: #a43e39;
  background: #fff1ef;
}

.document-list__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.document-list__action {
  padding: 5px 0;
  color: #315d8e;
  background: transparent;
  border: 0;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.document-list__action--remove {
  color: #a13d38;
}

.document-list__action:focus-visible {
  outline: 2px solid #729bc9;
  outline-offset: 3px;
}

.document-list__empty {
  display: flex;
  min-height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  text-align: center;
  background: #fafbfd;
  border: 1px dashed #cbd5e1;
  border-radius: 5px;
}

.document-list__empty h3 {
  margin: 12px 0 0;
  color: #24374f;
  font-size: 15px;
}

.document-list__empty p {
  max-width: 350px;
  color: #738094;
  font-size: 12px;
  line-height: 1.7;
}

.document-list__footnote {
  margin: 18px 0 0;
  padding-top: 14px;
  color: #7b8796;
  border-top: 1px solid #edf0f4;
  font-size: 11px;
  line-height: 1.7;
}

.document-list__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (max-width: 650px) {
  .document-list {
    padding: 16px;
  }

  .document-list__header {
    flex-direction: column;
  }

  .document-list__title {
    font-size: 23px;
  }

  .document-list__table {
    min-width: 580px;
  }
}
`;

function formatFileSize(bytes) {
  if (bytes === 0) return "0 KB";
  if (bytes == null || isNaN(bytes)) return "—";
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileType(doc) {
  if (doc?.type) return String(doc.type).toUpperCase();
  const name = doc?.name || doc?.filename || "";
  const ext = name.split(".").pop();
  if (ext && ext !== name) {
    const upper = ext.toUpperCase();
    if (upper === "PDF") return "PDF";
    if (upper === "TXT") return "TXT";
    if (upper === "DOC" || upper === "DOCX") return "DOC";
  }
  return "TXT";
}

function getStatusDetails(status) {
  const norm = String(status || "").trim().toLowerCase();
  switch (norm) {
    case "ready":
    case "processed":
      return { label: "Ready", className: "document-list__status--ready" };
    case "processing":
      return { label: "Processing", className: "document-list__status--processing" };
    case "failed":
    case "error":
      return { label: "Failed", className: "document-list__status--failed" };
    case "needs review":
    case "review":
    case "pending":
      return { label: "Needs review", className: "document-list__status--review" };
    default:
      return {
        label: status || "Needs review",
        className: "document-list__status--review"
      };
  }
}

export default function DocumentList({
  documents = [],
  onRemove,
  onDelete,
  onView
}) {
  const docList = Array.isArray(documents) ? documents : [];
  const handleRemove = onRemove || onDelete;
  const hasActions = Boolean(onView || handleRemove);

  return (
    <>
      <style>{styles}</style>

      <section
        className="document-list"
        aria-labelledby="document-list-heading"
      >
        <div className="document-list__header">
          <div>
            <p className="document-list__eyebrow">CASE FILES</p>
            <h2 className="document-list__title" id="document-list-heading">
              Document library
            </h2>
            <p className="document-list__description">
              Review the documents associated with this case.
            </p>
          </div>

          <span className="document-list__count">
            {docList.length}{" "}
            {docList.length === 1 ? "document" : "documents"}
          </span>
        </div>

        {docList.length === 0 ? (
          <div className="document-list__empty">
            <h3>No documents added yet</h3>
            <p>
              Add PDF or TXT case records to start organizing the case timeline.
            </p>
          </div>
        ) : (
          <div className="document-list__table-wrap">
            <table className="document-list__table">
              <thead>
                <tr>
                  <th scope="col">Document</th>
                  <th scope="col">Size</th>
                  <th scope="col">Status</th>
                  {hasActions && (
                    <th scope="col">
                      <span className="document-list__sr-only">Actions</span>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {docList.map((document, index) => {
                  const docId = document?.id || `doc-${index}`;
                  const docName =
                    document?.name || document?.filename || "Untitled document";
                  const docSize = document?.size ?? document?.size_bytes;
                  const docDate =
                    document?.uploadedAt || document?.upload_date;
                  const docType = getFileType(document);
                  const statusInfo = getStatusDetails(document?.status);

                  return (
                    <tr key={docId}>
                      <td>
                        <div className="document-list__file">
                          <span
                            className={`document-list__file-icon document-list__file-icon--${docType.toLowerCase()}`}
                            aria-hidden="true"
                          >
                            {docType}
                          </span>

                          <div className="document-list__file-info">
                            <span className="document-list__file-name">
                              {docName}
                            </span>

                            {docDate && (
                              <span className="document-list__file-date">
                                {docDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="document-list__size">
                        {formatFileSize(docSize)}
                      </td>

                      <td>
                        <span
                          className={`document-list__status ${statusInfo.className}`}
                        >
                          <span
                            className="document-list__status-dot"
                            aria-hidden="true"
                          />
                          {statusInfo.label}
                        </span>
                      </td>

                      {hasActions && (
                        <td>
                          <div className="document-list__actions">
                            {onView && (
                              <button
                                type="button"
                                className="document-list__action"
                                onClick={() => onView(document)}
                                aria-label={`View ${docName}`}
                              >
                                View
                              </button>
                            )}

                            {handleRemove && (
                              <button
                                type="button"
                                className="document-list__action document-list__action--remove"
                                onClick={() => handleRemove(docId)}
                                aria-label={`Remove ${docName}`}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="document-list__footnote">
          Always review extracted information against the original source.
        </p>
      </section>
    </>
  );
}
