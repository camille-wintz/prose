import {
  createBasicElementsPlugin,
  createBoldPlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createPlateUI,
  createPlugins,
  createSelectOnBackspacePlugin,
  ELEMENT_HR,
} from "@udecode/plate";
import {
  AutoformatPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  NormalizeTypesPlugin,
  PlatePlugin,
  ResetNodePlugin,
  SelectOnBackspacePlugin,
  TrailingBlockPlugin,
} from "@udecode/plate";
import { EditableProps } from "slate-react/dist/components/editable";
import { autoformatRules } from "./autoformatRules";

const resetBlockTypesCommonRule = {
  types: [ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
  defaultType: ELEMENT_PARAGRAPH,
};

interface Config {
  editableProps: EditableProps;
  align: Partial<PlatePlugin>;
  autoformat: Partial<PlatePlugin<{}, AutoformatPlugin>>;
  forceLayout: Partial<PlatePlugin<{}, NormalizeTypesPlugin>>;
  lineHeight: Partial<PlatePlugin>;
  resetBlockType: Partial<PlatePlugin<{}, ResetNodePlugin>>;
  selectOnBackspace: Partial<PlatePlugin<{}, SelectOnBackspacePlugin>>;
  trailingBlock: Partial<PlatePlugin<{}, TrailingBlockPlugin>>;
}

export const config: Config = {
  editableProps: {
    // autoFocus: process.env.NODE_ENV !== 'production',
    autoFocus: false,
    spellCheck: false,
    placeholder: "Type…",
    style: {
      padding: "15px",
    },
  },
  align: {
    inject: {
      props: {
        validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
      },
    },
  },
  lineHeight: {
    inject: {
      props: {
        defaultNodeValue: "normal",
        validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
      },
    },
  },
  resetBlockType: {
    options: {
      rules: [
        {
          ...resetBlockTypesCommonRule,
          hotkey: "Enter",
          predicate: isBlockAboveEmpty,
        },
        {
          ...resetBlockTypesCommonRule,
          hotkey: "Backspace",
          predicate: isSelectionAtBlockStart,
        },
      ],
    },
  },
  trailingBlock: { type: ELEMENT_PARAGRAPH },
  selectOnBackspace: {
    options: {
      query: {
        allow: [ELEMENT_HR],
      },
    },
  },
  autoformat: {
    options: {
      rules: autoformatRules,
    },
  },
  forceLayout: {
    options: {
      rules: [{ path: [0], strictType: ELEMENT_H1 }],
    },
  },
};

const basicElements = createPlugins(
  [createHeadingPlugin(), createParagraphPlugin()],
  {
    components: createPlateUI(),
  }
);

const basicMarks = createPlugins([createBoldPlugin(), createItalicPlugin()], {
  components: createPlateUI(),
});

export const plugins = {
  basicElements,
  basicMarks,
  basicNodes: createPlugins([...basicElements, ...basicMarks], {
    components: createPlateUI(),
  }),
  image: createPlugins(
    [
      createBasicElementsPlugin(),
      ...basicMarks,
      createSelectOnBackspacePlugin(config.selectOnBackspace),
    ],
    {
      components: createPlateUI(),
    }
  ),
};
