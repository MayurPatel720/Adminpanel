import React from "react";

export default function FieldInfo({ field }: { field: any }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <p style={{ fontSize: `14px ` }}>{field.state.meta.touchedErrors}</p>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
