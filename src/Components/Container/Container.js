export default function Container(props) {
  const containerStyle = {
    paddingTop: props.pt || props.py,
    paddingBottom: props.pb || props.py,
    marginTop: props.mt || props.my,
    marginBottom: props.mb || props.my,
  };

  return (
    <div className="col-10 col-lg-10 mx-auto p-0" style={containerStyle}>
      <div className={props.className}>{props.children}</div>
    </div>
  );
}
