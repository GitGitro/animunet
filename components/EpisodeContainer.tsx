import React, { useState } from "react";
import Link from "next/link";
import { SelectItem, Select, Button } from "@nextui-org/react"; // Assuming Button component is defined elsewhere
import PetIcon from "@/components/Icons/PetIcon";

const EpisodeContainer = ({ data }: any) => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const episodes = data.episodes;

  const handleGroupChange = (value: number) => {
    setSelectedGroup(value);
  };

  const renderEpisodeButtons = () => {
    const startIndex = selectedGroup * 100;
    const endIndex = Math.min(startIndex + 100, episodes.length);

    const episodeButtons = [];
    for (let i = startIndex; i < endIndex; i++) {
      const episode = episodes[i];
      episodeButtons.push(
        <Link
          shallow
          key={`episode-${data.id}-${episode.number}`}
          href={`/watch/${data.id}/${episode.number}`}
        >
          <Button
            isIconOnly
            color="primary"
            variant="shadow"
            key={episode.id}
            href={episode.url}
          >
            {episode.number}
          </Button>
        </Link>
      );
    }
    return episodeButtons;
  };

  const renderGroupDropdown = () => {
    if (episodes.length > 100) {
      const totalGroups = Math.ceil(episodes.length / 100);
      const options = Array.from({ length: totalGroups }, (_, index) => ({
        value: index,
        label: `${index * 100 + 1}-${Math.min(
          (index + 1) * 100,
          episodes.length
        )}`,
      }));

      return (
        <Select
          size="sm"
          color="primary"
          variant="underlined"
          startContent={<PetIcon />}
          placeholder="Select an episode group"
          className="max-w-xs text-foreground bg-background"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-foreground bg-background"
              onClick={() => handleGroupChange(option.value)}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      );
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto ">
        <div className="">
          {renderGroupDropdown()}
          <div className="flex flex-wrap gap-2 items-center pt-6">
            {renderEpisodeButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeContainer;
