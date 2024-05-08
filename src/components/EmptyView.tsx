type EmptyViewProps = {
  message?: string;
};
const EmptyView: React.FC<EmptyViewProps> = ({
  message = "No Data Found!",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "75vh",
        lineHeight: "75vh",
      }}
    >
      {message}
    </div>
  );
};

export default EmptyView;
