import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import SetlistActionsCell from "./SetlistActionsCell";

test("renders setlist actions given a setlist", () => {
  const { asFragment } = render(<SetlistActionsCell data={{}} />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    data-theme="light"
  >
    <div
      class="dropdown dropdown-left dropdown-middle"
      role="listbox"
    >
      <label
        tabindex="0"
      >
        <label
          class="btn-ghost"
          tabindex="0"
        >
          <button
            class="btn"
          >
            <span
              class="material-symbols-outlined"
            >
              more_vert
            </span>
          </button>
        </label>
        <ul
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          tabindex="0"
        >
          <ul
            class="bg-base-200 rounded-box shadow-sm"
          >
            <a
              class="flex p-2 items-center hover:bg-base-100"
              href="/setlist/undefined"
            >
              <div
                class="inline-flex min-w-[56px] flex-shrink-0"
              >
                <span
                  class="material-symbols-outlined"
                >
                  pageview
                </span>
              </div>
              <div
                class="flex-[1_1_auto] min-w-0 mt-1 mb-1"
              >
                 View
              </div>
            </a>
            <a
              class="flex p-2 items-center hover:bg-base-100"
              href="/setlist/undefined/edit"
            >
              <div
                class="inline-flex min-w-[56px] flex-shrink-0"
              >
                <span
                  class="material-symbols-outlined"
                >
                  edit
                </span>
              </div>
              <div
                class="flex-[1_1_auto] min-w-0 mt-1 mb-1"
              >
                 Edit
              </div>
            </a>
            <div
              class="flex-[1_1_auto] min-w-0 mt-1 mb-1 flex p-2 items-center hover:bg-base-100 cursor-pointer"
            >
              <div
                class="inline-flex min-w-[56px] flex-shrink-0"
              >
                <span
                  class="material-symbols-outlined"
                >
                  delete
                </span>
              </div>
              <div
                class="flex-[1_1_auto] min-w-0 mt-1 mb-1"
              >
                 Delete
              </div>
               
            </div>
          </ul>
        </ul>
      </label>
      <ul
        class="dropdown-content"
      />
    </div>
    <div
      style="position: fixed; z-index: 9999; top: 16px; left: 16px; right: 16px; bottom: 16px; pointer-events: none;"
    />
  </div>
</DocumentFragment>
`);
});
