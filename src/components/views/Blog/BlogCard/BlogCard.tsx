import { Image } from "@heroui/react";
import Link from "next/link";

interface BlogCardProps {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
}

const BlogCard = ({ id, title, excerpt, image, date }: BlogCardProps) => {
    return (
        <Link href={`/product/blog/${id}`} className="block group">
            <div className="bg-white rounded-lg overflow-hidden border border-[#E4E4E4] hover:shadow-md transition-shadow">
                <div className="h-[180px] overflow-hidden">
                    <Image
                        alt={title}
                        src={image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        radius="none"
                        fallbackSrc="https://via.placeholder.com/400x200?text=Blog+Image"
                    />
                </div>
                <div className="p-4">
                    <p className="text-xs text-primary mb-2">{date}</p>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{excerpt}</p>
                </div>
            </div>
        </Link>
    );
};
export default BlogCard