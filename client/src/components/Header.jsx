import { GearIcon } from "@radix-ui/react-icons";

export const Header = ({ setIsPreferencesOpen, floorInfo }) => {
  return (
    <header className="pb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold leading-tight">
            {floorInfo.name}
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            {floorInfo.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsPreferencesOpen((prev) => {
              const next = !prev;
              console.log("Preferences open:", next);
              return next;
            })
          }
          aria-label="Navigation settings"
          className="rounded-md p-2 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        >
          <GearIcon width={18} height={18} />
        </button>
      </div>
    </header>
  );
};
