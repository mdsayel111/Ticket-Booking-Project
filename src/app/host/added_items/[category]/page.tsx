import SpecificCategoryItems from "@/ClientFiles/Components/Shared/SpecificCategoryItems";


const page = async ({
  params,
}: {
  params: { category: string };
  searchParams: Record<string, string>;
}) => {
  return <SpecificCategoryItems callFromHost={true} />;
};

export default page;
