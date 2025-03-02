const AddItem = () => {
  return (
    <>
      <form>
        <h2>Share the Moments</h2>

        <input type="text" placeholder="title" />
        <input type="text" placeholder="message" />
        <input type="text" placeholder="tags" />

        <input type="file" name="img-upload" id="" />

        <button>Share</button>
        <button>Clear X</button>
      </form>
    </>
  );
};

export default AddItem;
