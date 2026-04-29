export default function ProductDetails({ title, detailsData }) {
  return (
    <div>
      <p className="text-medium font-bold tracking-wide mb-2">{title}</p>
      {detailsData.map((data) => (
        <div key={data._id} className="inline-flex">
          <button className="border border-gray-300 mx-1 rounded-2xl p-4 py-6 border-dashed ">
            {data.name}
          </button>
        </div>
      ))}
    </div>
  );
}
