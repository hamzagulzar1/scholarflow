import SearchBar from "@/components/SearchBar";
import Image from 'next/image';

const Page = () => {
    return (
        // The main container should be set to the height of the viewport
        <div className="relative flex justify-center items-center w-screen h-screen overflow-hidden">
            {/* Position a div absolutely and fill the entire container */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                {/* Use the Next.js Image component to fill the div */}
                <Image
                    src="/bg-image.png"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            {/* Center the SearchBar in the screen */}
            {/* z-index of 10 to ensure it's above the background image */}
            <div className="z-10 mb-[100px]">
                <SearchBar />
            </div>
        </div>
    );
};

export default Page;
