/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Tab, Tabs } from "@heroui/react";
import { CircleOff } from "lucide-react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface PropTypes {
  data: any;
}

const dummy = {
  reviews: [
    {
      id: 1,
      name: "Daniel R.",
      date: "May 20, 2025",
      rating: 5,
      comment:
        "Works perfectly with my Shelly setup. The response time is super fast, and the single press-back for a very longer than expected. 10/10, worth it!",
      avatar: "/images/avatar-1.png",
    },
    {
      id: 2,
      name: "Kevin T.",
      date: "May 20, 2025",
      rating: 5,
      comment:
        "I love how small this = this thing of looks good on my desk. Impressive build time and smart control buttons!",
      avatar: "/images/avatar-2.png",
    },
    {
      id: 3,
      name: "Maria L.",
      date: "May 20, 2025",
      rating: 4,
      comment:
        "I use these and like – the signal is not always right in my living room but in a range – works great. Will reorder!",
      avatar: "/images/avatar-3.png",
    },
    {
      id: 4,
      name: "Sophie A.",
      date: "May 30, 2025",
      rating: 5,
      comment:
        "A really fast, my parents for the response time to be a bit slower but they really trust SH Button - its nice customization",
      avatar: "/images/avatar-4.png",
    },
  ],
};

const TabsProductDetail = (props: PropTypes) => {
  const { data } = props;
  const [selected, setSelected] = useState("description");
  return (
    <Tabs aria-label="Tabs variants" variant='underlined' selectedKey={selected} onSelectionChange={(key) => setSelected(key as string)}>
      <Tab className="text-lg font-reguler !text-primary" key="description" title="Description">
        <div className="border border-bordered rounded-lg p-10">
          {data?.description ? (
            <div dangerouslySetInnerHTML={{ __html: data?.description?.replaceAll('<p', '<h5') }}></div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <CircleOff size={48} className="text-muted" />
              <p className="text- text-base">No description available for this product</p>
            </div>
          )}
        </div>
      </Tab>

      <Tab className="text-lg font-reguler !text-primary" key="addition" title="Addition information">
        <div className="overflow-x-auto border border-bordered rounded-lg">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-bordered">
                <td className="py-4 px-6 bg-secondary text-primary font-bold text-base w-1/4 border-r border-bordered">
                  Weight
                </td>
                <td className="py-4 px-6 text-primary font-bold text-base">
                  {data?.weight} {data?.unit_of_weight}
                </td>
              </tr>
              <tr className="border-b border-bordered">
                <td className="py-4 px-6 bg-secondary text-primary font-bold text-base border-r border-bordered">
                  Dimensions
                </td>
                <td className="py-4 px-6 text-primary font-bold text-base">
                  {data?.length} x {data?.width} x {data?.height} {data?.unit_of_length}
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 bg-secondary text-primary font-bold text-base border-r border-bordered">
                  Color
                </td>
                <td className="py-4 px-6 text-primary font-bold text-base">
                  {data?.attributes?.map((data: any, index: number) => (
                    <span key={index}>
                      {data?.values?.join(', ')}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Tab>

      <Tab className="text-lg font-reguler !text-primary" key="reviews" title="Reviews">
        <div className="border border-bordered rounded-lg p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummy.reviews.map((review) => (
              <div
                key={review.id}
                className="border border-bordered rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-primary">
                          {review.name}
                        </p>
                        <p className="text-xs text-muted">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            size={10}
                            fill={i < review.rating ? "#FFD700" : "#E5E7EB"}
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-bordered"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-primary mt-2">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};

export default TabsProductDetail;
