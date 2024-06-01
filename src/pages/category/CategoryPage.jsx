import Topbar from "../../components/topbar/Topbar";
import CategoryTab from "./CategoryTab";

const CategoryPage = () => {
  return (
    <section className="w-full">
      <Topbar title="Category Setting" containerClassName={"px-3"} />
      <div className="px-3">
        <CategoryTab />
      </div>
    </section>
  );
};

export default CategoryPage;
