import CreateAlbumForm from "./components/CreateAlbumForm";
import Posts from "./queries/PostsQuery";
import UpdatePost from "./components/UpdatePost";
import DeletePost from "./components/DeletePost";
function App() {
  return (
    <>
      <Posts />
      <CreateAlbumForm />
      <UpdatePost />
      <DeletePost />
    </>
  );
}

export default App;
