import AddMovie from "@/ClientFiles/Components/AddMovie/AddMovie";
import AddMovieOrEvent from "@/ClientFiles/Components/AddMovieOrEvent/AddMovieOrEvent";

const page = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  console.log(params);
  return (
    <div className="mb-40">
      {category !== "movies" ? (
        <AddMovieOrEvent category={category} />
      ) : (
        <AddMovie />
      )}
    </div>
  );
};

export default page;
