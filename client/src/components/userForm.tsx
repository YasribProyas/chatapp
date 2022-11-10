import PhotoRadio from "./photoRadio";
export default function UserForm() {
  return (
    <form>
      <h1>User</h1>
      <div className="label-input-grp">
        <label htmlFor="name-input">Name</label>
        <input id="name-input" type="text" required name="name" />
      </div>
      <br />
      <label>Photo</label>
      <div className="radio-group">
        <PhotoRadio
          value="robot"
          checked
          imgLink="https://via.placeholder.com/50"
        />
        <PhotoRadio value="cat" imgLink="https://via.placeholder.com/50" />
      </div>

      <button type="submit">Next</button>
    </form>
  );
}
