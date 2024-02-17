import AddMovie from "@/ClientFiles/Components/AddMovie/AddMovie";
import AddEventOrSports from "@/ClientFiles/Components/AddMovieOrEvent/AddEventOrSportst";

const page = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  console.log(params);
  return (
    <div className="mb-40">
      {category !== "movies" ? (
        <AddEventOrSports category={category} />
      ) : (
        <AddMovie />
      )}
    </div>
  );
};

export default page;
