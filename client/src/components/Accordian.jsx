import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function Accordian({ sections, defaultOpenIds = [] }) {
  return (
    <section className="mt-6">
      <Accordion.Root
        type="multiple"
        defaultValue={defaultOpenIds}
        className="space-y-4"
      >
        {sections.map((section) => (
          <Accordion.Item
            key={section.id}
            value={section.id}
            className="rounded-xl"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between py-3 text-left text-lg font-semibold">
                <span>{section.title}</span>
                <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="data-[state=closed]:animate-accordionUp data-[state=open]:animate-accordionDown overflow-hidden">
              <div className="space-y-3 pb-2">
                {section.items.map((item) => (
                  <InfoRow key={item.id} item={item} />
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}

function InfoRow({ item }) {
  return (
    <button
      type="button"
      onClick={item.onClick}
      className="flex w-full items-center justify-between gap-3 rounded-md border border-neutral-300 bg-white px-4 py-3 text-left hover:bg-neutral-50"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-neutral-700">{item.leftIcon}</div>
        <div>
          <div className="font-medium">{item.title}</div>
          {item.subtitle ? (
            <div className="text-sm text-neutral-600">{item.subtitle}</div>
          ) : null}
        </div>
      </div>

      <div className="text-neutral-700">{item.rightIcon}</div>
    </button>
  );
}
