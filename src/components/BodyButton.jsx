export default function BodyButton(props) {
  const { category } = props;
  return (
    <>
      <button id={category.id} type="button" className="body-btn btn-link">
        <h2 className="font-color-primary">{category.name}</h2>
      </button>
    </>
  );
}
