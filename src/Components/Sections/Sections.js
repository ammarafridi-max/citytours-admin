export function PrimarySection(props) {
  const style = {
    padding: "100px 20px",
  };
  return <section className={props.className}>{props.children}</section>;
}

export function ImgSection(props) {
  const sectionStyle = {
    backgroundImage: `linear-gradient( 180deg, rgb( 0, 0, 0, 0.8), rgb( 0, 0, 0, 0), rgb( 0, 0, 0, 0), rgb( 0, 0, 0, 0.8) ), url(${props.backgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "noRepeat",
    backgroundSize: "cover",
    padding: "150px 0 100px 0",
  };

  return (
    <section className={props.className} style={sectionStyle}>
      {props.children}
    </section>
  );
}
