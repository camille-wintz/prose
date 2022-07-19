import { Li } from "@/Components/Common/Typography";

export const Empty = () => {
  return (
    <div className="max-w-[960px] m-auto">
      <h1 className="text-3xl mt-10">Story Grid</h1>
      <p className="text-content-1 font-semibold text-sm">
        How to setup your story grid
      </p>
      <ul className="mt-4">
        <Li>
          Use <span className="text-blue">@Act</span> to create an act (acts end
          when another act begins)
        </Li>
        <Li>
          Use <span className="text-blue">@Scene</span> to create a scene
          (scenes end at the end of the current chapter or when another scene
          begins)
        </Li>
      </ul>
      <p className="mt-6 font-semibold text-sm text-content-1 mb-2">Example</p>
      <p className="p-6 bg-white rounded-md">
        <code>
          <span className="text-blue">@Act “Main plot”</span>
          <br />
          <span className="text-blue">
            @Scene “Moving in the haunted house”
          </span>
          <br />
          The little house looked innocuous, perched on a hill of emerald grass,
          catching stray sunrays in early spring. Dan and I had visited so many
          potential homes that day, we were ready to love any of them. This one
          didn't need the additional help. It screamed, "Love me, love me, love
          me!" and I did, although its ravenous hunger for inhabitants should
          have made me wary rather than eager.
        </code>
      </p>
    </div>
  );
};
