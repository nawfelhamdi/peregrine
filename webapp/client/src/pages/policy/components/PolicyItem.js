export default function PolicyItem({ policyItem }) {
  return (
    <div className="py-8">
      <div className="mb-3">
        {policyItem.title ? (
          <p className="text-xl font-extrabold leading-none sm:text-2xl xl:text-3xl">
            {policyItem.title}
          </p>
        ) : null}
      </div>
      {policyItem.details.map((item) => (
        <div key={item.id}>
          {item.subTitle ? (
            <p className="text-gray-900 font-bold md:text-md md:text-xl my-3">
              {item.subTitle}
            </p>
          ) : null}
          <div>
            {item.paragraphs.map((item) => (
              <p key={item} className="text-gray-700 my-5">
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
