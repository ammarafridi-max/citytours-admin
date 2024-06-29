export default function PrimaryButton(props) {
  const linkStyle = {
    width: "fit-content",
  };

  const btnStyle = {
    backgroundColor: "#0E9FF2",
    fontSize: "15px",
    width: props.width === "100%" && "100%",
    padding: "8px 30px",
    border: "none",
    color: "white",
    borderRadius: "3px",
    marginTop: props.mt || props.my,
    marginBottom: props.mb || props.my,
  };

  return (
    <a href={props.href} style={linkStyle}>
      <button
        style={btnStyle}
        className={props.className}
        type={props.type}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </a>
  );
}
