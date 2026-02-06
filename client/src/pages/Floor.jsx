import { useParams } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";
import { Accordian } from "../components/Accordian";
import { Footer } from "../components/Footer";
import {
  InfoCircledIcon,
  ExitIcon,
  PersonIcon,
  AccessibilityIcon,
  PinRightIcon,
} from "@radix-ui/react-icons";
import floorData from "../data/floorData";

const Floor = () => {
  const { id } = useParams();
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const floorId = Number(id);
  const floor = floorData.find((f) => f.id === floorId);

  if (!floor) {
    return <div>Floor not found</div>;
  }

  const sections = [
    {
      id: "emergency",
      title: "Emergency & Essential",
      items: [
        {
          id: "emergency-exit",
          title: "Emergency Exit",
          subtitle: "Nearest emergency exit is 45m east",
          leftIcon: <InfoCircledIcon />,
          rightIcon: <PinRightIcon />,
        },
        {
          id: "main-exit",
          title: "Main Exit",
          subtitle: "Floor 1 · One floor down",
          leftIcon: <ExitIcon />,
          rightIcon: <PinRightIcon />,
        },
        {
          id: "info-desk",
          title: "Information Desk",
          subtitle: "Floor 1, near main entrance",
          leftIcon: <PersonIcon />,
          rightIcon: <PinRightIcon />,
        },
      ],
    },
    {
      id: "accessibility",
      title: "Accessibility",
      items: [
        {
          id: "washroom",
          title: "Accessible Washroom",
          subtitle: "Floor 2 · 85m west",
          leftIcon: <AccessibilityIcon />,
          rightIcon: <PinRightIcon />,
        },
        {
          id: "elevator",
          title: "Elevator",
          subtitle: "Floor 2 · 120m west",
          leftIcon: <AccessibilityIcon />,
          rightIcon: <PinRightIcon />,
        },
        {
          id: "seating",
          title: "Accessible Seating",
          subtitle: "Multiple locations · View all",
          leftIcon: <AccessibilityIcon />,
          rightIcon: <PinRightIcon />,
        },
      ],
    },
    {
      id: "amenities",
      title: "Amenities",
      items: [
        {
          id: "water",
          title: "Water Fountain",
          subtitle: "Nearby",
          leftIcon: <InfoCircledIcon />,
          rightIcon: <PinRightIcon />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header
        isPreferencesOpen={isPreferencesOpen}
        setIsPreferencesOpen={setIsPreferencesOpen}
        floorInfo={floor}
      />

      <main className="px-4 py-6 md:px-6 md:py-8">
        <img
          src={floor.floorPlan}
          alt={`Map of Floor ${floor.name}`}
          height="700"
          width="auto"
        />
        <Accordian sections={sections} defaultOpenIds={[]} />
      </main>
      <Footer
        links={[
          { label: "Terms", href: "/terms" },
          { label: "Privacy", href: "/privacy" },
          { label: "Cookie notice", href: "/cookies" },
          { label: "Survey", href: "/survey" },
        ]}
      />
    </div>
  );
};

export default Floor;
