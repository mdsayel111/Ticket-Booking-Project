import CategoryTitle from "./CategoryTitle/CategoryTitle";
import CategoryViewAll from "./CategoryViewAll/CategoryViewAll";

const CategoryHeader = ({
  values,
}: {
  values: { title: string; link: string };
}) => {
  const { title, link } = values;
  return (
    <div className="flex justify-between my-6">
      <CategoryTitle values={{ title: title }} />
      <CategoryViewAll values={{ link: link }} />
    </div>
  );
};

export default CategoryHeader;
