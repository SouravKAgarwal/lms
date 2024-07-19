import Image from "next/image";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const reviews = [
    {
      name: "Riya Sharma",
      avatar: "https://edmy-react.hibootstrap.com/images/banner/client-3.jpg",
      profession: "Software Engineer",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum maiores consequuntur ipsam quod Reprehenderit cupiditate rerum sunt provident nam dolorem ratione laborum fugiat accusamus!",
    },
    {
      name: "Vikram Singh",
      avatar: "https://edmy-react.hibootstrap.com/images/banner/client-3.jpg",
      profession: "Doctor",
      rating: 3,
      comment: "Very informative and helpful content.",
    },
    {
      name: "Aisha Kapoor",
      avatar: "https://edmy-react.hibootstrap.com/images/banner/client-3.jpg",
      profession: "Teacher",
      rating: 5,
      comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
    {
      name: "Dev Patel",
      avatar: "https://edmy-react.hibootstrap.com/images/banner/client-3.jpg",
      profession: "Musician",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum maiores consequuntur ipsam quod Reprehenderit cupiditate rerum sunt provident nam dolorem ratione laborum fugiat accusamus!",
    },
    {
      name: "Priya Das",
      avatar: "https://edmy-react.hibootstrap.com/images/banner/client-3.jpg",
      profession: "Entrepreneur",
      rating: 4,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum maiores consequuntur ipsam quod Reprehenderit cupiditate rerum sunt provident nam dolorem ratione",
    },
    {
      name: "Priya Das",
      avatar: "https://edmy-react.hibootstrap.com/images/banner/client-3.jpg",
      profession: "Entrepreneur",
      rating: 4,
      comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
  ];
  return (
    <div className="w-[90%] md:w-[80%] m-auto">
      <div className="w-full md:flex items-center gap-4">
        <div className="md:w-[50%] w-full">
          <Image src="/reviews.png" width={700} height={700} />
        </div>
        <div className="md:w-[50%] w-full">
          <h3 className="text-4xl font-bold tracking-tight capitalize">
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br />
            See what they say about us
          </h3>
          <p className="text-sm/6 text-gray-400 dark:text-gray-500 mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum
            maiores consequuntur ipsam quod omnis molestiae porro deleniti!
            Reprehenderit cupiditate rerum sunt provident nam dolorem ratione
            laborum fugiat accusamus!
          </p>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] 2xl:grid-cols-3 2xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(4)]:mt-[-60px]">
        {reviews &&
          reviews.map((rev, i) => <ReviewCard key={i} review={rev} />)}
      </div>
    </div>
  );
};

export default Reviews;
