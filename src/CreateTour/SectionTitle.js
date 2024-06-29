export default function SectionTitle({ number, children }) {
  return (
    <div className="row align-items-center mb-2">
      {/* <p style={contentNumberStyle}>{number}</p> */}
      <h2>{children}</h2>
    </div>
  );
}
