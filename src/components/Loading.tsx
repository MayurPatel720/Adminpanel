import { ProgressSpinner } from "primereact/progressspinner";

export default function Loading() {
  return (
    <div className="loa">
      <div className="loader">
        <ProgressSpinner />
      </div>
    </div>
  );
}
