import SpecificCategoryItems from "@/ClientFiles/Components/Shared/SpecificCategoryItems";

const page = async ({
  params,
}: {
  params: { category: string };
  searchParams: Record<string, string>;
}) => {
  return <SpecificCategoryItems />;
};

export default page;
