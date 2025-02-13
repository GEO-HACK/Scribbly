import React from "react";
import Menu from "@/components/menu/Menu";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const fetchData = async (slug) => {
  try {
    const query = `${process.env.NEXTAUTH_URL}/api/posts/${slug}`;
    const res = await fetch(query, { cache: "no-cache" });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const json = await res.json();
    return json.post; // Ensure we only return the post data
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null;
  }
};
const singlePage = async ({ params }) => {
  "use server";
  if (!params || !params.slug) {
    return <p>Error: missing slug</p>;
  }

  const { slug } = params;
  const data = await fetchData(params.slug);
  
  return (
    <div>
      <div className="flex flex-wrap items-center gap-[30px] md:gap-[50px]">
        <div className="flex-1">
          {/* Title with responsive text size */}
          <h1 className="text-[24px] md:text-[32px] lg:text-[40px] mb-[30px] md:mb-[50px] font-bold">
            {data?.title}
          </h1>
          <div className="flex gap-2 items-center">
            <div>
              {data.user.image && (
                <Image
                  src={data?.user.image || "/placeholder.jpg"}
                  alt=""
                  width={30}
                  height={30}
                  className="w-10 h-10 rounded-full"
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{data?.user.name}</span>
              <span className="text-[12px] text-gray-400 font-bold">
                {/* {data?.createdAt.substring(0,10)}-{" "} */}
                {new Date(data.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        {/* Hide image on smaller screens */}
        <div className="relative h-[350px] flex-1 hidden md:flex items-center justify-center">
          <Image
            src={data?.img || "/placeholder.jpg"}
            alt=""
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute object-cover rounded-md"
          />
        </div>
      </div>

      <div className="flex  gap-[20px] md:gap-[30px] mt-6">
        {/* Content Section */}
        <div className="w-full md:w-[70%]">
          <div
            className="flex flex-col gap-[20px] md:gap-[30px]"
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />

          <div className="mt-10">
            <Comments postSlug={slug} />
          </div>
        </div>
        {/* Sidebar Menu */}
        <Menu />
      </div>
    </div>
  );
};

export default singlePage;
