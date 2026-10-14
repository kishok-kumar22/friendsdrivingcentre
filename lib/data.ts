import { images } from "./images";
import { siteConfig } from "./siteConfig";

export type IconName =
  | "user"
  | "road"
  | "parking"
  | "wheel"
  | "shieldPlus"
  | "clock"
  | "pin"
  | "shieldCheck";

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface HeroFeature {
  readonly icon: IconName;
  readonly title: string;
}

export interface TrainingProgram {
  readonly id: number;
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
}

export interface WhyChooseItem {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

export interface TestimonialItem {
  readonly name: string;
  readonly review: string;
  readonly city: string;
  readonly image: string;
  readonly rating: number;
}

export const navigation: readonly NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Training Programs", href: "#programs" },
  { label: "Why Choose Us", href: "#why" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const heroFeatures: readonly HeroFeature[] = [
  { icon: "user", title: "One-to-One Mentor" },
  { icon: "clock", title: "Flexible Timings" },
  { icon: "road", title: "Real-Road Practice" },
];

export const programs: readonly TrainingProgram[] = [
  {
    id: 1,
    icon: "user",
    title: "Women-to-Women Training",
    description: "Personalised, comfortable, and patient driving training exclusively with certified female instructors.",
    features: [
      "100% certified female instructors",
      "Comfortable & supportive learning space",
      "Doorstep training at your own pace",
    ],
    image: images.program1,
    imageAlt: "Certified female driving instructor offering one-to-one coaching to female learner",
  },
  {
    id: 2,
    icon: "user",
    title: "One-to-One Mentor",
    description: "Personalised training with an individual instructor.",
    features: [
      "100% focused attention",
      "Customized learning pace",
      "Instant feedback & guidance",
    ],
    image: images.program2,
    imageAlt: "Certified instructor giving one-to-one personalized driving coaching to a learner inside car",
  },
  {
    id: 3,
    icon: "road",
    title: "Street Confidence",
    description: "Driving on streets and narrow roads.",
    features: [
      "City traffic & real road experience",
      "Narrow lanes & tight turns",
      "Build confidence in everyday driving",
    ],
    image: images.program3,
    imageAlt: "Driver view navigating bustling city street traffic and narrow lanes in Chennai",
  },
  {
    id: 4,
    icon: "parking",
    title: "Parking Mastery",
    description: "Parallel parking, reverse parking, and slope starts.",
    features: [
      "Parallel parking practice",
      "Reverse parking techniques",
      "Slope start & hill hold control",
    ],
    image: images.program4,
    imageAlt: "White car practicing precision parallel parking and reverse maneuvers around orange traffic cones",
  },
  {
    id: 5,
    icon: "road",
    title: "Highway & Overtaking Skills",
    description: "Safe overtaking and highway awareness.",
    features: [
      "Highway driving techniques",
      "Safe overtaking practice",
      "Speed control & lane discipline",
    ],
    image: images.program5,
    imageAlt: "Open multilane highway under bright sky for high-speed lane discipline and overtaking training",
  },
  {
    id: 6,
    icon: "wheel",
    title: "Independent Driving Stage",
    description: "Driving independently while the trainer monitors progress.",
    features: [
      "Build real-world independence",
      "Trainer observes & supports",
      "Final assessment & confidence check",
    ],
    image: images.program6,
    imageAlt: "Student driving independently on an open road with trainer monitoring from the passenger seat",
  },
];

export const benefits: readonly WhyChooseItem[] = [
  {
    icon: "shieldPlus",
    title: "Experienced Instructors",
    description: "Certified & friendly trainers with years of experience.",
  },
  {
    icon: "user",
    title: "1-on-1 Guidance",
    description: "Personalised attention for better learning.",
  },
  {
    icon: "clock",
    title: "Flexible Timings",
    description: "Early morning or late evening slots available.",
  },
  {
    icon: "pin",
    title: "Real-World Training",
    description: "Actual roads, real situations, real confidence.",
  },
  {
    icon: "shieldCheck",
    title: "Safe & Supportive",
    description: "Your safety is our top priority.",
  },
];

/**
 * Real learner reviews for structured data and social proof.
 * Note: schema guidelines require reviews to be from authentic patrons.
 */
export const testimonials: readonly TestimonialItem[] = [
  {
    name: "Priya S",
    review:
      "The one-to-one training was the best part. My instructor was patient and gave me confidence to drive on busy roads.",
    city: "Chennai",
    image: images.avatar1,
    rating: 5,
  },
  {
    name: "Arun K",
    review:
      "I learned parking, highway driving and everything step by step. Now I drive independently with confidence.",
    city: "Tambaram",
    image: images.avatar2,
    rating: 5,
  },
  {
    name: "Meena R",
    review:
      "The flexible timings and real-road practice really helped me. Highly recommended!",
    city: "Velachery",
    image: images.avatar3,
    rating: 5,
  },
];

export const contact = {
  email: siteConfig.email,
  phone: siteConfig.telephone,
  phoneHref: siteConfig.phoneHref,
  whatsappNumber: siteConfig.whatsappNumber || siteConfig.telephone.replace(/\D/g, ""),
  address: siteConfig.displayAddress,
};

export const socialLinks = siteConfig.socialLinks;
