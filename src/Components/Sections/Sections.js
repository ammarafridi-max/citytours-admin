import styles from "./Sections.module.css";

export function PrimarySection({
  children,
  className,
  pt,
  pb,
  py,
  pl,
  pr,
  px,
  mt,
  mb,
  my,
  ml,
  mr,
  mx,
}) {
  const style = {
    marginTop: mt || my,
    marginBottom: mb || my,
    marginLeft: ml || mx,
    marginRight: mr || mx,
    paddingTop: pt || py,
    paddingBottom: pb || py,
    paddingLeft: pl || px,
    paddingRight: pr || px,
  };
  return (
    <section className={`${styles.primarySection} ${className}`} style={style}>
      {children}
    </section>
  );
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
