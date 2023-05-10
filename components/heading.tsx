import { FC } from "react";

type headingsTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
  tag?: headingsTags;
  text: string;
  className?: string;
}

const Heading: FC<HeadingProps> = ({ tag = "h1", text, className }) => {
  const Tag = tag;
  return <Tag className={className}>{text} </Tag>;
};

export default Heading;
