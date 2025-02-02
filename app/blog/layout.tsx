import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nishant's Machine Learning Blog",
    description: "A personal blog by Nishant dedicated to machine learning",
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}