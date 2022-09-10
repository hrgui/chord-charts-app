import SongView, { SongViewKey } from "./SongView";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";
import { vi } from "vitest";

describe("SongView", () => {
  it("should be able to render a song if provided normally", () => {
    const { queryByText, getByTestId } = render(
      <SongView
        pageTitle="Test"
        data={{
          title: "Test",
          artist: "Test 2",
          key: "A",
          sections: [
            {
              body: "A B C \r\n TEST SECTION 1",
            },
          ],
        }}
      />
    );

    const sectionEl = queryByText("TEST SECTION 1");
    expect(sectionEl).not.toBeNull();

    const song = getByTestId("song");
    expect(song).toMatchInlineSnapshot(`
<div
  class="song-view-container"
  data-testid="song"
>
  <div
    class="overflow-hidden bg-base-200 p-4 mb-2 rounded-sm"
  >
    <div
      class="group cursor-pointer font-semibold flex items-center"
    >
      <svg
        class="fill-current ml-auto opacity-100 sm:hidden sm:ml-2 group-hover:block h-[24px]"
        data-testid="songsection-close"
        font-size="small"
        height="32"
        viewBox="0 0 512 512"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
        />
      </svg>
    </div>
    <pre
      class="print-cc-body overflow-auto border-none block"
    >
      <div>
        <pre>
          <span
            class="chord text-[#2159df] font-bold"
          >
            A
          </span>
           
          <span
            class="chord text-[#2159df] font-bold"
          >
            B
          </span>
           
          <span
            class="chord text-[#2159df] font-bold"
          >
            C
          </span>
           
 TEST SECTION 1
        </pre>
      </div>
    </pre>
  </div>
</div>
`);
  });

  it("should be able to render a song with an override key applied", () => {
    const { getByTestId } = render(
      <SongView
        pageTitle="Test"
        settings={{ overrideKey: "B" }}
        data={{
          title: "Test",
          artist: "Test 2",
          key: "A",
          sections: [
            {
              body: "A B C \r\n TEST SECTION 1",
            },
          ],
        }}
      />
    );

    const chordSelect: HTMLSelectElement = getByTestId(
      "chordSelect"
    ) as HTMLSelectElement;
    expect(chordSelect).toBeInTheDocument();
    expect(chordSelect.value).toEqual("B");
  });

  describe("sectionSettings applied", () => {
    it("should adhere to sectionSettings if it is to be hidden", () => {
      const { getByTestId } = render(
        <SongView
          pageTitle="Test"
          settings={{ sectionsSettings: [{ hide: false }, { hide: true }] }}
          data={{
            title: "Test",
            artist: "Test 2",
            key: "A",
            sections: [
              {
                body: "A B C \r\n TEST SECTION 1",
              },
              {
                body: "D C E \r\n TEST SECTION 2",
              },
            ],
          }}
        />
      );

      const song = getByTestId("song");
      expect(song).toMatchInlineSnapshot(`
<div
  class="song-view-container"
  data-testid="song"
>
  <div
    class="overflow-hidden bg-base-200 p-4 mb-2 rounded-sm"
  >
    <div
      class="group cursor-pointer font-semibold flex items-center"
    >
      <svg
        class="fill-current ml-auto opacity-100 sm:hidden sm:ml-2 group-hover:block h-[24px]"
        data-testid="songsection-close"
        font-size="small"
        height="32"
        viewBox="0 0 512 512"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
        />
      </svg>
    </div>
    <pre
      class="print-cc-body overflow-auto border-none block"
    >
      <div>
        <pre>
          <span
            class="chord text-[#2159df] font-bold"
          >
            A
          </span>
           
          <span
            class="chord text-[#2159df] font-bold"
          >
            B
          </span>
           
          <span
            class="chord text-[#2159df] font-bold"
          >
            C
          </span>
           
 TEST SECTION 1
        </pre>
      </div>
    </pre>
  </div>
  <span
    data-testid="sectionview-hidden"
  />
</div>
`);
    });
  });
});

describe("SongViewKey", () => {
  it("should be able to render without crashing, if all props provided", () => {
    const changeEvent = vi.fn();
    const { queryByText } = render(
      <SongViewKey overrideKey={"A"} onChange={changeEvent} />
    );
    expect(queryByText("A")).not.toBeNull();
  });
});
