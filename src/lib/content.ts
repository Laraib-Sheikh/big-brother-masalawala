export type Testimonial = {
  quote: string;
  name: string;
  meta?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  dateLabel: string;
  author: string;
  href: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I recently purchased Aloo Bukhara and was pleasantly surprised by the quality. It was incredibly fresh and well-packed. Delivery was very fast. Highly recommend!",
    name: "Huma Niaz",
    meta: "Verified Buyer",
  },
  {
    quote:
      "I bought Chia Seeds for weight loss, and I'm impressed! Excellent quality, top-notch packaging, and super fast delivery. Highly recommended.",
    name: "Mehwish Aslam",
    meta: "Verified Buyer",
  },
  {
    quote:
      "The aroma and flavor were amazing! Fast delivery and top-notch quality. Definitely ordering again.",
    name: "Fatima Mughal",
    meta: "Verified Buyer",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "proper-way-to-apply-perfumes-2025",
    title: "Proper way to apply perfumes 2025",
    dateLabel: "Feb 28, 2025",
    author: "Team Arome",
    href: "/blog/proper-way-to-apply-perfumes-2025",
  },
  {
    slug: "top-5-timeless-classic-fragrances",
    title: "Top 5 Timeless & Classic Fragrances",
    dateLabel: "Feb 28, 2025",
    author: "Team Arome",
    href: "/blog/top-5-timeless-classic-fragrances",
  },
  {
    slug: "our-perfumers-picks-of-the-top-8",
    title: "Our Perfumers’ Picks Of The Top 8",
    dateLabel: "Feb 28, 2025",
    author: "Team Arome",
    href: "/blog/our-perfumers-picks-of-the-top-8",
  },
];

