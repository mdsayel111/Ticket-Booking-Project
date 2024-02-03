import CategoryPage from "@/ClientFiles/Components/Category";

const page = async ({
  params,
}: {
  params: { category: string };
  searchParams: Record<string, string>;
}) => {
  return (
    <CategoryPage />
  );
};

export default page;
