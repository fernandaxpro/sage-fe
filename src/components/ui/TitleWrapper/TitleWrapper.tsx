import { Tooltip } from "@heroui/react";

interface Props {
  title: string;
}

const TitleWrapper = ({ title }: Props) => {
  const isLong = title.length > 54;
  const displayTitle = isLong ? title.slice(0, 54) + "..." : title;

  const titleElement = (
    <p className="text-black text-base font-semibold">{displayTitle}</p>
  );

  return isLong ? (
    <Tooltip content={title} showArrow={true}>
      {titleElement}
    </Tooltip>
  ) : (
    titleElement
  );
};

export default TitleWrapper;
