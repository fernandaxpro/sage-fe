"use client";

import { useState } from "react";
import { Image, Input } from "@heroui/react";
import { FaSearch } from "react-icons/fa";
import Container from "@/components/ui/Container";
import Link from "next/link";

// Blog categories
const categories = [
    "General",
    "Access Control",
    "Alarm",
    "Automation",
    "CCTV",
    "Locks",
    "Networking",
    "Accessories",
    "Installation Service",
];

// Dummy blog data
const blogPosts = [
    {
        id: 1,
        title: "Enhancing Security with Smart Access Control Systems",
        excerpt: "Learn how smart access control helps manage and monitor entry points efficiently, and keeps your property ...",
        image: "/images/blog/blog-1.jpg",
        date: "November 12, 2025",
        category: "Access Control",
    },
    {
        id: 2,
        title: "Top 5 Features to Look for in a Modern Alarm System",
        excerpt: "From sound alerts to mobile control, discover what makes an alarm system truly reliable ...",
        image: "/images/blog/blog-2.jpg",
        date: "November 10, 2025",
        category: "Alarm",
    },
    {
        id: 3,
        title: "Building a Smarter Home with Automation Devices",
        excerpt: "Explore how automation brings convenience and control to your everyday life - from ...",
        image: "/images/blog/blog-3.jpg",
        date: "November 08, 2025",
        category: "Automation",
    },
    {
        id: 4,
        title: "Choosing the Right CCTV Camera for Your Property",
        excerpt: "Find out what camera type suits your security needs - indoor, outdoor, or advanced AI-based ...",
        image: "/images/blog/blog-4.jpg",
        date: "October 22, 2025",
        category: "CCTV",
    },
    {
        id: 5,
        title: "Digital Locks: The Future of Keyless Security",
        excerpt: "Discover how digital locks offer safer and smarter access for both residential and commercial ...",
        image: "/images/blog/blog-5.jpg",
        date: "October 18, 2025",
        category: "Locks",
    },
    {
        id: 6,
        title: "Why Strong Network Infrastructure Matters for Security Systems",
        excerpt: "Understand how a reliable network boosts your alarm and CCTV performance with stable, real-time ...",
        image: "/images/blog/blog-6.jpg",
        date: "October 04, 2025",
        category: "Networking",
    },
];

// Blog Card Component
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

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [showCount, setShowCount] = useState(10);

    // Filter posts by category and search
    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory = !selectedCategory || post.category === selectedCategory;
        const matchesSearch = !searchQuery ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-gray-500">
                <Link href="/" className="text-gray-400 cursor-pointer hover:text-primary">Home</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-primary">Blog</span>
            </div>

            {/* Page Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">Blog</h1>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Blog Content */}
                <div className="flex-1">
                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        {/* Search */}
                        <div className="relative w-full sm:w-[250px]">
                            <Input
                                placeholder="Search for blog here"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                size="sm"
                                radius="sm"
                                classNames={{
                                    input: "text-sm",
                                    inputWrapper: "border border-[#E4E4E4] bg-white",
                                }}
                                endContent={
                                    <FaSearch size={14} className="text-gray-400" />
                                }
                            />
                        </div>

                        {/* Sort & Show Controls */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-xs text-gray-500">Sort by</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="text-xs border border-[#E4E4E4] rounded px-2 py-1.5 bg-white"
                                >
                                    <option value="latest">Latest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="popular">Popular</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-xs text-gray-500">Show</label>
                                <select
                                    value={showCount}
                                    onChange={(e) => setShowCount(Number(e.target.value))}
                                    className="text-xs border border-[#E4E4E4] rounded px-2 py-1.5 bg-white"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.slice(0, showCount).map((post) => (
                            <BlogCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                excerpt={post.excerpt}
                                image={post.image}
                                date={post.date}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No blog posts found.</p>
                        </div>
                    )}
                </div>

                {/* Categories Sidebar */}
                <div className="lg:w-[200px] flex-shrink-0">
                    <div className="border border-[#E4E4E4] rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li key={category}>
                                    <button
                                        onClick={() => setSelectedCategory(
                                            selectedCategory === category ? null : category
                                        )}
                                        className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${selectedCategory === category
                                                ? "bg-primary/10 text-primary font-medium"
                                                : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Blog;
