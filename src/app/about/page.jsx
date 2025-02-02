import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

const page = () => {
  return (
    <>
      <div className="relative bg-white h-[500px]">
        <Image
          src="/about.avif"
          alt="this is the featured product"
          fill
          className="absolute object-cover rounded-lg opacity-50"
        />
        {/* Centering Text */}
        <div className=" flex-col absolute inset-0 flex mt-20 p-3 justify-start">
          <h1 className="text-black dark:text-white text-5xl font-bold ">
            SCRIBBLY: Where ideas take flight
          </h1>
          <div className="flex flex-row gap-4 mt-4">
            <button className="text-md  bg-orange-500 px-4 py-3">
              Start scribbling
            </button>
            <button className="text-md  bg-orange-500 px-4 py-3">
              {" "}
              Explore the community
            </button>
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="flex items-center bg-orange-500 h-[600px]">
        <div className=" flex flex-col bg-white h-[350px] w-[90%] mx-auto p-6">
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            About Scribbly
          </h1>
          <div className="flex flex-row gap-4 mt-5 px-6 justify-between">
            <div className="flex flex-col w-[40%]">
              <h1 className="text-xl font-semibold text-black dark:text-white">
                A Canvas for Your Thoughts
              </h1>
              <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg leading-relaxed ">
                Scribbly is a platform where anyone can share their ideas,
                thoughts, and stories with the world. Whether you're a seasoned
                writer or just starting out, Scribbly provides a welcoming and
                supportive environment for you to express yourself.
              </p>
            </div>
            <div className="flex flex-col w-[40%]">
              <h1 className="text-xl font-semibold text-black dark:text-white">
                A community of Thinkers
              </h1>
              <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg leading-relax">
                Our community is a diverse group of individuals who share a
                passion for creative expression. Connect with like-minded
                people, share your work, and receive feedback on your ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Third section */}

      <div className="flex flex-row h-[550px] justify-between ">
        <div className="flex flex-col gap-4 w-[50%] p-6">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col bg-gray-200 p-3">
              <h1 className="text-xl font-semibold text-stone-500 dark:text-stone-300">
                Empowering Voices
              </h1>
              <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg leading-relaxed">
                We believe everyone has something valuable to share. We aim to
                empower individuals to find their voice and connect with others
                who share their interests.
              </p>
            </div>
            <div className="flex flex-col bg-gray-200 p-3">
              <h1 className="text-xl font-semibold text-stone-500 dark:text-stone-300">
                Cultivating Creativity
              </h1>
              <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg leading-relaxed">
                Scribbly provides a space for exploration, experimentation, and
                growth. We want to foster a culture of creativity and inspire
                others to pursue their passions.
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-gray-200 p-3">
            <h1 className="text-xl font-semibold text-stone-500 dark:text-stone-300">
              Building Community
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg leading-relaxed">
              We strive to create a welcoming and inclusive environment where
              people can engage in meaningful conversations and build lasting
              connections.Links HomePage Blog
            </p>
          </div>
        </div>
        <div className="relative bg-white h-[500px]">
          <Image
            src="/mission.jpg"
            alt="this is missions image"
            width={400}
            height={400}
          />
        </div>
      </div>

      {/* fourth section */}
      <div className="flex items-center bg-orange-500 h-[600px]">
        <div className=" flex flex-col bg-white h-[350px] w-[90%] mx-auto p-6 items-center">
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            How Scribbly works
          </h1>

          <div className="flex flex-row gap-4 mt-5 px-6 justify-between">
            <div className="flex flex-col items-center w-[30%]">
              <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center">
                <span className="text-xl font-bold">1</span>
              </div>
              <h1 className="text-xl font-semibold mt-4 text-black dark:text-white">
                Sign Up
              </h1>
              <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg leading-relaxed text-center">
                Create an account to start sharing your ideas and joining the
                Scribbly community.
              </p>
            </div>
            <div className="flex flex-col items-center w-[30%]">
              <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center">
                <span className="text-xl font-bold">2</span>
              </div>
              <h1 className="text-xl font-semibold mt-4 text-black dark:text-white">
                start scribbling
              </h1>
              <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg leading-relaxed text-center">
                Write your thoughts, stories, or poems. Use our tools to format
                your content and add visual elements.
              </p>
            </div>
            <div className="flex flex-col items-center w-[30%]">
              <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center">
                <span className="text-xl font-bold">3</span>
              </div>
              <h1 className="text-xl font-semibold mt-4 text-black dark:text-white">
                Share your scribble
              </h1>
              <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg leading-relaxed text-center">
                Publish your scribble and share it with the community. You can
                choose to make it public or private.
              </p>
            </div>
            <div className="flex flex-col items-center w-[30%]">
              <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center">
                <span className="text-xl font-bold">4</span>
              </div>
              <h1 className="text-xl font-semibold mt-4 text-black dark:text-white">
                Engage & connect
              </h1>
              <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg leading-relaxed text-center">
                Read other scribbles, leave comments, and connect with fellow
                Scribblers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* fifth section */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col p-6 w-[50%]">
          <h1 className="text-3xl text-black dark:text-white">
            Share your thoughts
          </h1>

          <div className="flex flex-row gap-4 mt-5">
            <div className=" flex flex-col p-3 w-[40%]">
              <FontAwesomeIcon
                icon={faPen}
                className="w-6 h-6 text-orange-500 hover:text-yellow-600 mb-3"
              />

              <h1 className="text-xl text-stone-500 dark:text-stone-300">
                Write
              </h1>
              <p className="text-gray-500 dark:text-gray-300 text-md">
              Compose your thoughts and share them with the world.
              </p>
            </div>
            <div className="  flex flex-col p-3 w-[40%]">
              <FontAwesomeIcon
                icon={faHeart}
                className="w-6 h-6 text-orange-500 hover:text-yellow-600 mb-3"
              />
              <h1 className="text-xl text-stone-500 dark:text-stone-300">
                Express
              </h1>
              <p className="text-gray-500 dark:text-gray-300 text-md">
              Express your creativity and let your voice be heard.


              </p>
            </div>
          </div>
          <div className="  flex flex-col p-3 mt-5 w-[40%]">
            <FontAwesomeIcon
              icon={faComment}
              className="w-6 h-6 text-orange-500 hover:text-yellow-600 mb-3"
            />

            <h1 className="text-xl text-stone-500 dark:text-stone-300">
              Connect
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-md">
            Engage with others and share your unique perspective.
            </p>
          </div>
        </div>
        <div>
          <Image
            src="/create.jpg"
            alt="this is creativity section image"
            width={400}
            height={400}
          />
        </div>
      </div>
    </>
  );
};

export default page;
